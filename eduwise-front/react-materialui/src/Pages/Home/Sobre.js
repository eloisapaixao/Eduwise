import './Sobre.css'
import { useNavigate } from 'react-router-dom'
import logo from "../../Imagens/eduwise.png"
import visitantes from "../../Imagens/People visiting history museum-bro.png"
import instagram from "../../Imagens/instagram.png"
import github from "../../Imagens/github.png"
import linkedin from "../../Imagens/linkedin.png"
import eloisa from "../../Imagens/eloisa.png"
import leticia from "../../Imagens/leticia.png"
import nycolle from "../../Imagens/nycolle.jpg"
import padovan from "../../Imagens/padovan.jpg"



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
                                        <img src={eloisa} alt="Eloisa" />
                                        <p class="nome-user">Eloísa Paixão</p>
                                    </div>
                                    <div class="redes">
                                        <div class="rede-user">
                                            <div class="insta-icon">
                                                <img src={instagram} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p><a href="https://www.instagram.com/elo_paixaoo/">@elo_paixaoo</a></p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="github-icon">
                                                <img src={github} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="github-user">
                                            <p><a href="https://github.com/eloisapaixao">Eloisa Paixão</a></p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="in-icon">
                                                <img src={linkedin} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="in-user">
                                            <p><a href="https://www.linkedin.com/in/eloisa-paix%C3%A3o-oliveira-230449276/">Eloisa Paixão Oliveira</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="comentario-user">
                                Aqui é a Eloisa e estou super feliz por fazer parte dessa equipe maravilhosa! É uma oportunidade incrível 
                                estar aprendendo e crescendo. Como responsável pelo banco de dados e API, estou animada para colaborar e 
                                garantir que tudo funcione perfeitamente. Vamos criar soluções fantásticas!
                                </p>
                            </div>

                            <div class="card-item">
                                <div class="card-infos">
                                    <div>
                                        <img src={leticia} alt="Leticia" />
                                        <p class="nome-user">Letícia Fochi</p>
                                    </div>
                                    <div class="redes">
                                        <div class="rede-user">
                                            <div class="insta-icon">
                                                <img src={instagram} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p><a href="https://www.instagram.com/lele_juliani/">@lele_juliani</a></p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="github-icon">
                                                <img src={github} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="github-user">
                                                <p><a href="https://github.com/lelejuliani">Letícia Fochi Juliani</a></p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="in-icon">
                                                <img src={linkedin} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="in-user">
                                                <p><a href="https://www.linkedin.com/in/let%C3%ADcia-fochi-juliani-727a46328/">Letícia Fochi Juliani</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="comentario-user">
                                    Fala, pessoal! Sou a Letícia e estou muito feliz por integrar essa equipe maravilhosa! Ser responsável pela inteligência artificial 
                                    é uma grande honra e uma oportunidade mutio legal na minha carreira. Estou ansiosa para continuar colaborando com a equipe, trocar 
                                    ideias e trazer inovações que vão fazer a diferença. Juntos, podemos alcançar grandes conquistas!
                                </p>
                            </div>

                            <div class="card-item">
                                <div class="card-infos">
                                    <div>
                                        <img src={padovan} alt="Maria Eduarda" />
                                        <p class="nome-user">Maria Eduarda Padovan</p>
                                    </div>
                                    <div class="redes">
                                        <div class="rede-user">
                                            <div class="insta-icon">
                                                <img src={instagram} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p><a href="https://www.instagram.com/padovsz/">@padovsz</a></p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="github-icon">
                                                <img src={github} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="github-user">
                                                <p><a href="https://github.com/padovsz">Madu Padovan</a></p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="in-icon">
                                                <img src={linkedin} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="in-user">
                                                <p><a href="https://www.linkedin.com/in/maria-eduarda-padovan/">Maria Eduarda Padovan</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="comentario-user">
                                    Oi, galera! Sou a Maria Eduarda, responsável pelo front-end, e quero compartilhar que estou muito satisfeita em fazer parte deste time. 
                                    Estou animada para continuar contribuindo com nosso trabalho, melhorando as interfaces e a experiência do usuário. Vamos seguir juntos
                                    em busca de resultados excelentes!
                                </p>
                            </div>

                            <div class="card-item">
                                <div class="card-infos">
                                    <div>
                                        <img src={nycolle} alt="Nycolle" />
                                        <p class="nome-user">Nycolle Rodrigues</p>
                                    </div>
                                    <div class="redes">
                                        <div class="rede-user">
                                            <div class="insta-icon">
                                                <img src={instagram} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="insta-user">
                                                <p><a href="https://www.instagram.com/nycollero/">@nycollero</a></p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="github-icon">
                                                <img src={github} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="github-user">
                                                <p><a href="https://github.com/cc21258">Nycolle Rodrigues</a></p>
                                            </div>
                                        </div>
                                        <div class="rede-user">
                                            <div class="in-icon">
                                                <img src={linkedin} alt="" />
                                            </div>
                                            <div class="separator"></div>
                                            <div class="in-user">
                                                <p><a href="https://www.linkedin.com/in/nycollero/">Nycolle Rodrigues</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="comentario-user">
                                    Sou a Nycolle, responsável por integrar todas as partes do nosso projeto. Estou feliz por fazer parte dessa equipe e continuar 
                                    colaborando com as meninas. Vamos trabalhar juntos para garantir que tudo funcione em harmonia e que nossos objetivos sejam alcançados!
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