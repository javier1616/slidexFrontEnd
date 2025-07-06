export default (link_url,qrContainer) => {

  return `

<div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h2 class="fw-bold mb-0">Links para unirse a la sesión</h2>
                <ul class="d-grid gap-4 my-3 list-unstyled small">
                    <li class="d-flex gap-4">
                        <div> URL: ${link_url} </div> 
                        <div id='qrContainer'>${qrContainer}</div>
                    </li>
                </ul>
            </div>
            <div class="modal-footer justify-content-center">
                <button type="button" class="btn border-0 p-0 m-0" data-bs-dismiss="modal">
                    <i class="bi bi-check-circle-fill text-v-center btn-modal-aqua"></i>
                </button>
            </div>
        </div>
    </div>
</div>`;

}

