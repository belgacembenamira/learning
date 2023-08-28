/**
    * @description      : 
    * @author           : belgacem
    * @group            : 
    * @created          : 28/08/2023 - 13:52:46
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 28/08/2023
    * - Author          : belgacem
    * - Modification    : 
**/
import { Link } from "react-router-dom";

export default function FAQ() {
  return (
    <div>
      <section>
        <h3 className="text-center mb-2 pb-2 text-primary fw-bold">FAQ</h3>
        <h3 className="text-center mb-5">
          Les reponeses des question fréquante
        </h3>
        <div></div>
        <div className=" d-flex ">
          <div className="row d-flex ">
            <div className="col  d-flex   ">
              <div className="card bg-light mb-3 max-width: 18rem; mx-5 ">
                <div className="card-header">
                  <h6 className="mb-3 text-primary">
                    <i className="far fa-paper-plane text-primary pe-2"></i>
                    C'est qoui site educative ?
                  </h6>
                </div>
                <div className="card-body">
                  <p d-flex justify-content-cente>
                    <strong>
                      <u d-flex justify-content-cente>
                        My-App!
                      </u>
                    </strong>{" "}
                    My-App est site de educative  en linge
                  </p>
                </div>
              </div>
            </div>

            <div className="col d-flex  mb-3 justify-content-center">
              <div className="card bg-light  max-width: 18rem; ">
                <div className="card-header d-flex ">
                  <h6 className="text-primary d-flex justify-content-center">
                    <i className="fas fa-pen-alt text-primary  d-flex justify-content-cente"></i>
                    Comment contacter ?
                  </h6>
                </div>
                <div className="card-body d-flex ">
                  <p>
                    <strong>
                      <u d-flex justify-content-center>
                        A l'aide nos pages dans les reseau socieaux{" "}
                      </u>
                    </strong>{" "}
                    <div className=" d-none d-lg-block d-flex justify-content-cente">
                      <h6 d-flex justify-content-center>
                        Les reseaux sociaux sont:
                      </h6>
                    </div>
                    <a
                      target="_blank"
                      href="https://fr-fr.facebook.com/myshop.tunisie/"
                      className=" text-reset d-flex justify-content-center"
                      rel="noreferrer"
                    >
                      {" "}
                      Facebook
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      target="_blank"
                      href=" https://www.instagram.com/accounts/login/?next=/myshop.fr/"
                      className=" text-reset d-flex justify-content-center"
                    >
                      {" "}
                      Instagrem
                      <i className="fab fa-instagram"></i>
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="col d-flex ">
              <div className="card bg-light mb-3 max-width: 18rem; mx-5">
                <div className="card-header">
                  <h6 className="mb-3 text-primary d-flex justify-content-center">
                    <i className="fas fa-rocket text-primary pe-2 d-flex justify-content-cente"></i>{" "}
                    Si vous etes un autre message contactez nos a l'aide notre
                    from
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <p d-flex justify-content-cente>
                      Notre fromulaire
                      <Link
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        to={"/contact"}
                      >
                        {" "}
                        Contact 
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}