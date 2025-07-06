import { connection } from '../../js/Services/SignalR/signalR.js'

export default () =>{

    //se hace en un postRender para asegurarse que se haya cargado el DOM
    var accessCode = localStorage.getItem("accessCode");

    let sessionStatus = document.getElementById('sessionStatusSpan');
    console.log("sessionStatus")
    console.log(sessionStatus)
    let sessionCode = document.getElementById('sessionCodeSpan');
    console.log("sessionCodeSpan")
    console.log(sessionCode)
    sessionCode.textContent = accessCode
    sessionCode.classList.remove("text-danger");
    sessionCode.classList.add("text-success");
    sessionStatus.textContent = "Online";
    sessionStatus.classList.remove("text-danger");
    sessionStatus.classList.add("text-success");



    const btnFirst = document.getElementById("btn_first");
    const btnPrev = document.getElementById("btn_prev");
    const btnGoto = document.getElementById("btn_goto");
    const btnNext = document.getElementById("btn_next");
    const btnLast = document.getElementById("btn_last");
    
        console.log("btnFirst: ",btnFirst);
    
        btnFirst.addEventListener("click", () => {
            let sortedSlides = JSON.parse(localStorage.getItem("slides"));
            changeSlide(connection,localStorage.getItem("sessionId"),1,sortedSlides[0])
            localStorage.setItem('currentSlide',1);
            console.log("btn First");
        });
        btnPrev.addEventListener("click", () => {
            let currentIndex = localStorage.getItem('currentSlide');
            let slides = JSON.parse(localStorage.getItem("slides"));  
            if( currentIndex > 1 )
            {
                let sortedSlides = JSON.parse(localStorage.getItem("slides"));
                changeSlide(connection,localStorage.getItem("sessionId"),currentIndex-1,sortedSlides[currentIndex-2])
                localStorage.setItem('currentSlide',Number(currentIndex)-1);
            }
            console.log("btn Previous");
        });
        btnGoto.addEventListener("click", () => {
            let slides = JSON.parse(localStorage.getItem("slides"));  
            let slide = document.getElementById("goToInput").value;
            if(slide >= 1 && slide <= slides.length )
            {
                let sortedSlides = JSON.parse(localStorage.getItem("slides"));
                changeSlide(connection,localStorage.getItem("sessionId"),Number(slide),sortedSlides[Number(slide)-1])
                localStorage.setItem('currentSlide',slide);
                console.log('btn goTo --> slide:'+ slide);
            }
            else
            {
                alert('btn goTo : error --> indice no valido');
            }
        });
        btnNext.addEventListener("click", () => {
            let currentIndex = localStorage.getItem('currentSlide');
            let slides = JSON.parse(localStorage.getItem("slides"));     
            if( currentIndex < slides.length )
            {
                let sortedSlides = JSON.parse(localStorage.getItem("slides"));
                changeSlide(connection,localStorage.getItem("sessionId"),Number(currentIndex)+1,sortedSlides[Number(currentIndex)])
                localStorage.setItem('currentSlide',Number(currentIndex)+1);
            }
            console.log("btn Next");
        });
        btnLast.addEventListener("click", () => {
            let slides = JSON.parse(localStorage.getItem("slides"));
            let sortedSlides = JSON.parse(localStorage.getItem("slides"));
            changeSlide(connection,localStorage.getItem("sessionId"),slides.length,sortedSlides[slides.length-1])
            localStorage.setItem('currentSlide',slides.length);
            console.log("btn Last");
        });

        
        btnFirst.disabled = false;
        btnFirst.classList.remove("btn-disabled");
        btnFirst.classList.add("btn-primary");
        btnPrev.disabled = false;
        btnPrev.classList.remove("btn-disabled");
        btnPrev.classList.add("btn-primary");
        btnGoto.disabled = false;
        btnGoto.classList.remove("btn-disabled");
        btnGoto.classList.add("btn-primary");
        document.getElementById("goToInput").disabled = false;
        btnNext.disabled = false;
        btnNext.classList.remove("btn-disabled");
        btnNext.classList.add("btn-primary");
        btnLast.disabled = false;
        btnLast.classList.remove("btn-disabled");
        btnLast.classList.add("btn-primary");

}

//async function changeSlide(connection,sessionId,slideIndex){
    //envio msj al hub para modificar slide
//    await connection.invoke("ChangeSlide", sessionId, slideIndex);
//
//}

async function changeSlide(connection,sessionId,slideIndex,slide){

    // Determinar si el slide tiene pregunta
    const hasQuestion = slide.ask;
    // Busco la respuesta correcta y las opciones
    let answerCorrect = null;
    let options = null;
    if (hasQuestion) {
        const correctOption = slide.ask.options.find(opt => opt.isCorrect);
        answerCorrect = correctOption ? correctOption.optionText : null;
        options = slide.ask.options.map(opt => opt.optionText);
    }

    const slideRequest = {
        sessionId : sessionId,
        slideIndex: slideIndex,
        slideId : slide.idSlide,
        ask: hasQuestion ? slide.ask.askText : null,
        answerCorrect: hasQuestion ? answerCorrect : null,
        options: hasQuestion ? options : null
    }

    console.log("slideRequest: ", slideRequest);

    //await connection.invoke("ChangeSlide", sessionId, slideIndex);
   await connection.invoke("ChangeSlide", sessionId, slideRequest);
}