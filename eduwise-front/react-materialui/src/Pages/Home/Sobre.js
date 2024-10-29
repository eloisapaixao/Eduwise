import './Sobre.css'
import { useNavigate } from 'react-router-dom'
import logo from "../../Imagens/eduwise.png"
import visitantes from "../../Imagens/People visiting history museum-bro.png"
import instagram from "../../Imagens/instagram.png"
import github from "../../Imagens/github.png"
import linkedin from "../../Imagens/linkedin.png"


function RolagemEquipe() {
    const target = document.getElementsByClassName('equipe')[0];
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition; 
    const duration = 1000;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
};


export function Sobre() {
    return (
            <body>
                <header>
                    <div class="container">
                        <nav>
                            <a href="/">
                                <img src={logo} alt="Logo" />
                            </a>
                            <ul class="ul">
                                <a href="/">Início</a>
                                <a class="btn" href="/login">Login</a>
                            </ul>
                        </nav>
                        <section class="banner">
                            <div class="banner-text">
                                <h1>Quem Nós Somos?</h1>
                                <p>Olá! Somos um trio de alunas do Colégio Técnico de Campinas (COTUCA)
                                    e estamos emocionadas em compartilhar um pouco sobre nossa jornada e sonhos.
                                    Com o nome de Ártemis Innovative Education, estamos determinadas a deixar nossa
                                    marca no mundo, inspirando outros a se unirem à nossa causa e trabalharem juntos
                                    em prol de um futuro mais igualitário e justo. Estamos pavimentando o caminho
                                    para uma sociedade onde cada indivíduo tenha a oportunidade de alcançar seu pleno
                                    potencial através da educação.
                                </p>
                                <div ontouchstart="">
                                    <div class="button">
                                    <a href="#servicos" onClick={RolagemEquipe}>CLIQUE AQUI para conhecer a equipe</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </header>

                <section class="equipe">
                    <div class="container">
                        <h3>Equipe Ártemis Innovative Education</h3>
                        <p>Conheça um pouquinho mais de cada integrante que faz parte desse projeto inovador!</p>
                        <div class="cards">
                            <div class="card-item">
                                <div class="card-infos">
                                    <div>
                                        <img src={visitantes} alt="" />
                                        <p class="nome-user">Letícia Fochi</p>
                                    </div>
                                    <div class="redes">
                                        <div class="rede-user">
                                            <div class="insta-icon">
                                                <img src={instagram} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p><a href="">@lele_juliani</a></p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="in-icon">
                                                <img src={github} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p>@lele_juliani</p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="in-icon">
                                                <img src={linkedin} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p>@lele_juliani</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="comentario-user">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut finibus nulla, sit amet suscipit tellus.
                                </p>
                            </div>

                            <div class="card-item">
                                <div class="card-infos">
                                    <div>
                                        <img src={visitantes} alt="" />
                                        <p class="nome-user">Maria Eduarda Padovan</p>
                                    </div>
                                    <div class="redes">
                                        <div class="rede-user">
                                            <div class="insta-icon">
                                                <img src={instagram} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p><a href="">@maria_padovan</a></p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="in-icon">
                                                <img src={github} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p>@maria_padovan</p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="in-icon">
                                                <img src={linkedin} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p>@maria_padovan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="comentario-user">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut finibus nulla, sit amet suscipit tellus.
                                </p>
                            </div>

                            <div class="card-item">
                                <div class="card-infos">
                                    <div>
                                        <img src={visitantes} alt="" />
                                        <p class="nome-user">Nycolle Rodrigues</p>
                                    </div>
                                    <div class="redes">
                                        <div class="rede-user">
                                            <div class="insta-icon">
                                                <img src={instagram} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p><a href="">@nycolle_rodrigues</a></p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="in-icon">
                                                <img src={github} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p>@nycolle_rodrigues</p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="in-icon">
                                                <img src={linkedin} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p>@nycolle_rodrigues</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="comentario-user">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut finibus nulla, sit amet suscipit tellus.
                                </p>
                            </div>

                            <div class="card-item">
                                <div class="card-infos">
                                    <div>
                                        <img src={visitantes} alt="" />
                                        <p class="nome-user">Nycolle Rodrigues</p>
                                    </div>
                                    <div class="redes">
                                        <div class="rede-user">
                                            <div class="insta-icon">
                                                <img src={instagram} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p><a href="">@nycolle_rodrigues</a></p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="in-icon">
                                                <img src={github} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p>@nycolle_rodrigues</p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="in-icon">
                                                <img src={linkedin} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p>@nycolle_rodrigues</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="comentario-user">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut finibus nulla, sit amet suscipit tellus.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                <section class="footer">
                    <div class="container">
                        <div class="link">
                            <img src={logo} /> 
                        </div>
                        <p class="p1"><i>#JuntosPelaEducacao</i></p>
                        <p class="p2"><i>Copyright © 2024 - Direitos De Autor Ártemis Innovative Education.</i></p>
                    </div>
                </section>
            </body>
    )
}