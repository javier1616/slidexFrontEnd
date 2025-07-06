export default (link_url) => {

  return `

<div class="modal fade" id="shareLinksModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body mx-auto">
                <h2 class="fw-bold mb-0">Links para unirse a la sesión</h2>
                <ul class="d-grid gap-4 my-3 list-unstyled small">
                    <li class="d-flex flex-column gap-4 mx-auto">
                        <div> URL: ${link_url} </div> 
                        <div id='qrContainer' class="mx-auto"></div>
                    </li>
                </ul>
            </div>
            <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-primary p-0 m-0 fs-3" data-bs-dismiss="modal">
                    <i class="bi bi-check2 p-4"></i>
                </button>
            </div>
        </div>
    </div>
</div>`;

}

