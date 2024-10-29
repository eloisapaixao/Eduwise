import './Home.css'
import { useNavigate } from 'react-router-dom'
import logo from "../../Imagens/eduwise.png"
import seguir from "../../Imagens/Mobile Marketing-pana.png"
import professores from "../../Imagens/Learning-bro.png"
import alunos from "../../Imagens/Student stress-bro.png"
import visitantes from "../../Imagens/People visiting history museum-bro.png"
import captura1 from "../../Imagens/captura1.png"
import captura2 from "../../Imagens/captura2.png"
import instagram from "../../Imagens/instagram.png"
import whatsapp from "../../Imagens/whatsapp.png"
import tiktok from "../../Imagens/tiktok.png"
import seguir2 from "../../Imagens/Blog post-bro.png"

function RolagemServicos() {
    const target = document.getElementById('servicos');
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset; // Posição da seção
    const startPosition = window.pageYOffset; // Posição atual da rolagem
    const distance = targetPosition - startPosition; // Distância a ser percorrida
    const duration = 1000; // Duração da rolagem (em milissegundos, ex: 1000ms = 1s)
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

function RolagemComunidade() {
    const target = document.getElementById('comunidade');
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset; // Posição da seção
    const startPosition = window.pageYOffset; // Posição atual da rolagem
    const distance = targetPosition - startPosition; // Distância a ser percorrida
    const duration = 1000; // Duração da rolagem (em milissegundos, ex: 1000ms = 1s)
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

function RolagemProjeto() {
    const target = document.getElementById('projeto');
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset; // Posição da seção
    const startPosition = window.pageYOffset; // Posição atual da rolagem
    const distance = targetPosition - startPosition; // Distância a ser percorrida
    const duration = 1000; // Duração da rolagem (em milissegundos, ex: 1000ms = 1s)
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

export function Home() {
    return (
            <body>
                <header>
                    <div class="container">
                        <nav>
                            <a href="#">
                                <img src={logo} alt="Logo" />
                            </a>
                            <ul class="ul">
                                <a href="/sobre">Sobre Nós</a>
                                <a href="#servicos" onClick={RolagemServicos}>Serviços</a>
                                <a href="#projeto" onClick={RolagemProjeto}>Projeto</a>
                                <a href="#comunidade" onClick={RolagemComunidade}>Comunidade</a>
                                <a class="btn" href="/login">Login</a>
                            </ul>
                        </nav>
                        <section class="banner">
                            <div class="banner-text">
                                <h1>PLATAFORMA INTELIGENTE</h1>
                                <p>Com o objetivo de proporcionar uma educação personalizada, inclusiva e dinâmica, que respeite o ritmo individual de cada estudante.</p>
                                <div ontouchstart="">
                                    <div class="button">
                                    <a href="#servicos" onClick={RolagemServicos}>EXPLORE</a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="sobre-nos">
                            <div class="sobre">
                                <h3>SOBRE NÓS</h3>
                                <p className='texto-justificado'>
                                    Olá! Somos um trio de alunas do Colégio Técnico de Campinas (COTUCA)
                                    e estamos emocionadas em compartilhar um pouco sobre nossa jornada e sonhos.
                                    Com o nome de Ártemis Innovative Education, estamos determinadas a deixar nossa
                                    marca no mundo, inspirando outros a se unirem à nossa causa e trabalharem juntos
                                    em prol de um futuro mais igualitário e justo. Estamos pavimentando o caminho
                                    para uma sociedade onde cada indivíduo tenha a oportunidade de alcançar seu pleno
                                    potencial através da educação.
                                </p>
                                <a href=""><button class="botao-sobre">LER MAIS</button></a>
                            </div>
                            <div class="sobre-img">
                                <img src={seguir} alt="seguir" />
                            </div>
                        </section>
                    </div>
                </header>

                <section id="servicos">
                    <div class="container">
                        <h3>SERVIÇOS</h3>
                        <div class="row-cards">
                            <div class="row-card-item">
                                <img src={professores} alt="" />
                                <p class="nome-servico">PROFESSORES</p>
                                <p class="descricao-servico">Se você é <strong>professor</strong>, cadastre-se no site por 
                                    meio da Instituição em que faz parte e com isso melhore a educação abraçando 
                                    a tecnologia e abrindo portas para seus alunos!
                                </p>
                                <a href="/cadastrar"><button class="botao-servico">ENTRAR</button></a>
                            </div>

                            <div class="row-card-item">
                                <img src={alunos} alt="" />
                                <p class="nome-servico">AlUNOS</p>
                                <p class="descricao-servico">Como <strong>aluno</strong>, utilize a tecnologia apresentada 
                                    por esse projeto para aprimorar seus conhecimentos e focar naqueles em 
                                    que você tem mais dificuldade.
                                </p>
                                <a href="/cadastrar"><button class="botao-servico">ENTRAR</button></a>
                            </div>

                            <div class="row-card-item">
                                <img src={visitantes} alt="" />
                                <p class="nome-servico">VISITANTES</p>
                                <p class="descricao-servico">Está conhecendo o projeto? Quer inovar no ensino? Convidamos 
                                    você a dar uma passadinha na aba de Projeto para entender como o EduWise funciona!
                                </p>
                                <a href="#projeto" onClick={RolagemProjeto}><button class="botao-servico">PROJETO</button></a>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="projeto">
                    <div class="container">
                        <div class="projeto-p1">
                            <h3>PROJETO</h3>
                            <p className='texto-justificado'>O Projeto EduWise é uma inovação revolucionária que visa <strong>capacitar os professores 
                                do Ensino Fundamental I por meio da Tecnologia e Inteligência Artificial</strong>. Com o 
                                objetivo de tornar o processo de ensino mais personalizado e eficaz, o EduWise 
                                oferece ferramentas avançadas para os educadores administrarem individualmente 
                                seus alunos. Utilizando algoritmos inteligentes, o sistema analisa o desempenho 
                                acadêmico e as necessidades específicas de cada criança, permitindo aos professores 
                                identificar áreas de melhoria e desenvolver planos de ensino adaptados.

                                Além disso, o EduWise fornece recursos interativos e conteúdo educacional personalizado, 
                                criando um <strong>ambiente de aprendizado envolvente e estimulante para os alunos</strong>. Com essa 
                                abordagem inovadora, o projeto EduWise busca revolucionar a educação no ensino fundamental 
                                I, capacitando professores e ajudando cada criança a alcançar seu pleno potencial acadêmico.
                            </p>
                        </div>
                        <div class="projeto-img">
                            <img src={captura1} alt="projeto-p1" />
                        </div>
                    </div>
                </section>
                <section id="projeto">
                    <div class="container">
                        <div class="projeto-img">
                            <img src={captura2} alt="projeto-p1" />
                        </div>
                        <div class="projeto-p1">
                            <p className='texto-justificado'>Ao fazer isso, almejamos não apenas melhorar o desempenho acadêmico, mas também nutrir o <strong>engajamento
                                e a autoconfiança</strong> dos estudantes em seu aprendizado. Vislumbramos um ambiente educacional onde cada 
                                aluno possa florescer e prosperar, preparando-os para um futuro de sucesso. Em última análise, nosso 
                                sonho é estabelecer um sistema educacional verdadeiramente equitativo e eficaz, onde as oportunidades 
                                são acessíveis a todos, independentemente de suas origens ou circunstâncias.

                            </p>
                        </div>
                    </div>
                </section>

                <section id="comunidade">
                    <div class="container">
                        <div class="seguir">
                            <h3>COMUNIDADE</h3>
                            <p>Não esqueça de nos seguir nas <strong>redes sociais</strong> e conhecer toda a 
                                comunidade que faz parte do Eduwise com a gente!
                            </p>
                            <a href="https://www.instagram.com/artemisinnovative/?hl=am-et"><img src={instagram} alt="instagram" /> </a>
                            <a href="https://www.tiktok.com/@artemisinnovative"><img src={tiktok} alt="instagram" /> </a>
                            <img src={whatsapp} alt="whatsapp" />
                        </div>
                        <div class="seguir-img">
                            <img src={seguir2} alt="seguir" />
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