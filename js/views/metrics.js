import Navbar from "../../components/navbar_auth.js";
import {
  getMetricsForPresentDate,
  getMetricsForSessionGuid,
  SessionDuration,
} from "../../js/api.js";

Chart.register(ChartDataLabels);

export default async function renderMetricsListView(id) {
  return `${Navbar()}
    <div class="metrics-main-container">
      <div class="metrics-content">
        <h2 class="sx-heading text-center">Seleccioná una presentación</h2>
        <div class="metrics-layout">
          <div class="sessions-panel">
            <div class="sessions-header">
              <h3>Sesiones disponibles</h3>
            </div>
            <div class="presentation-list">
              <div class="loading-message">
                Cargando métricas para presentación #${id}...
              </div>
            </div>
          </div>
          <div class="metrics-panel">
            <div id="metrics-container" class="metrics-container">
              <div class="no-selection-message">
                Seleccioná una sesión para ver las métricas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function postRenderMetricsListView(id) {
  const container = document.querySelector(".presentation-list");

  try {
    const presentations = await getMetricsForPresentDate(id);

    const sessions = presentations.sessions || [];

    if (sessions.length === 0) {
      container.innerHTML = "<div class='no-sessions-message'>No hay presentaciones disponibles.</div>";
      return;
    }

    container.innerHTML = sessions
      .map(
        (session) => `
      <div class="presentation-box" 
           data-guid="${session.guid}">
        <div class="presentation-date">
          ${new Date(session.dateTime).toLocaleDateString()}
        </div>
        <div class="presentation-time">
          ${new Date(session.dateTime).toLocaleTimeString()}
        </div>
      </div>`
      )
      .join("");

    container.querySelectorAll(".presentation-box").forEach((box) => {
      box.addEventListener("click", async () => {
        // Remover clase activa de otros elementos
        container.querySelectorAll(".presentation-box").forEach(b => 
          b.classList.remove("active")
        );
        // Agregar clase activa al elemento clickeado
        box.classList.add("active");
        
        const guid = box.dataset.guid;
        const metricsContainer = document.getElementById("metrics-container");
        
        metricsContainer.innerHTML = "<div class='loading-metrics'>Cargando métricas...</div>";
        
        try {
          const metrics = await getMetricsForSessionGuid(guid);
          metrics.guid = guid;
          renderMetricsInContainer(metrics, metricsContainer);
        } catch (err) {
          metricsContainer.innerHTML =
            "<div class='error-message'>Error al cargar las métricas.</div>";
          console.error("Error al obtener métricas por guid:", err);
        }
      });
    });
  } catch (error) {
    container.innerHTML = "<div class='error-message'>Error al cargar las presentaciones.</div>";
    console.error("Error en fetchPresentations:", error);
  }
}

function formatDuration(timespanStr) {
  const [hoursStr, minutesStr, secondsStr] = timespanStr.split(":");

  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const seconds = Math.floor(parseFloat(secondsStr)); // descartamos decimales

  let parts = [];

  if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hora" : "horas"}`);
  if (minutes > 0)
    parts.push(`${minutes} ${minutes === 1 ? "minuto" : "minutos"}`);
  if (seconds > 0 || parts.length === 0)
    parts.push(`${seconds} ${seconds === 1 ? "segundo" : "segundos"}`);

  return parts.join(", ");
}

async function renderMetricsInContainer(data, container) {
  let duration = "No disponible";
  try {
    const durationResponse = await SessionDuration(data.guid);
    if (durationResponse?.duration) {
      duration = formatDuration(durationResponse.duration);
    }
  } catch (error) {
    console.error("No se pudo obtener la duración:", error);
  }

  const questionsStats = data.slides.map((slide) => {
    const correct = slide.accuracyPercentage;
    const incorrect = 100 - correct;
    return {
      question: slide.question,
      correct,
      incorrect,
    };
  });

  const totalCorrect = data.slides
    .map((s) => s.userResponses.filter((r) => r.isCorrect).length)
    .reduce((a, b) => a + b, 0);

  const totalIncorrect = data.slides
    .map((s) => s.userResponses.filter((r) => !r.isCorrect).length)
    .reduce((a, b) => a + b, 0);

  const sessionStats = {
    duration,
    totalUsers: Math.round(
      data.slides
        .map((s) => s.userResponses.length)
        .reduce((a, b) => a + b, 0) / data.slides.length
    ),
    avgCorrect: Math.round(data.totalAccuracyPercentage),
    totalCorrect,
    totalIncorrect,
  };

  container.innerHTML = `
    <div class="metrics-header">
      <h3>Métricas de la presentación</h3>
    </div>
    <div class="session-stats">
      <div class="stat-item">
        <span class="stat-label">Duración:</span>
        <span class="stat-value">${sessionStats.duration}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Usuarios conectados:</span>
        <span class="stat-value">${sessionStats.totalUsers}</span>
      </div>
    </div>
    <div class="general-chart-container">
      <canvas id="generalPerformanceChart" width="300" height="300"></canvas>
    </div>
    <div class="questions-charts-container">
      <h4>Métricas por pregunta</h4>
      <div class="charts-grid"></div>
    </div>
  `;

  const chartsContainer = container.querySelector(".charts-grid");

  questionsStats.forEach((q, index) => {
    const chartWrapper = document.createElement("div");
    chartWrapper.className = "chart-wrapper";
    
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    chartWrapper.appendChild(canvas);
    chartsContainer.appendChild(chartWrapper);

    new Chart(canvas, {
      type: "pie",
      data: {
        labels: ["Aciertos", "Fallos"],
        datasets: [
          {
            data: [q.correct, q.incorrect],
            backgroundColor: ["#4CAF50", "#F44336"],
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: q.question,
          },
          datalabels: {
            color: "#fff",
            formatter: (value, ctx) => {
              const data = ctx.chart.data.datasets[0].data;
              const total = data.reduce((a, b) => a + b, 0);
              if (value === 0 || total === 0) return "";
              const percentage = ((value / total) * 100).toFixed(0);
              return percentage === "0" ? "" : `${percentage}%`;
            },
            font: {
              weight: "bold",
              size: 14,
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  });

  new Chart(document.getElementById("generalPerformanceChart"), {
    type: "pie",
    data: {
      labels: ["Aciertos Totales", "Fallos Totales"],
      datasets: [
        {
          data: [sessionStats.totalCorrect, sessionStats.totalIncorrect],
          backgroundColor: ["#2196F3", "#FF9800"],
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: "Rendimiento general",
        },
        datalabels: {
          color: "#fff",
          formatter: (value, ctx) => {
            const data = ctx.chart.data.datasets[0].data;
            const total = data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(0);
            return percentage === "0" ? "" : `${percentage}%`;
          },
          font: {
            weight: "bold",
            size: 14,
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}