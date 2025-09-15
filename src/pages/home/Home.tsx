import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../App.css'
import { FaHeadset, FaHotel, FaPlane, FaTags } from 'react-icons/fa';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <>
            <div className="pt-[20px] px-[10%]">
                <div className="rounded-xl overflow-hidden shadow-md">
                    <Carousel
                        autoPlay
                        infiniteLoop
                        showThumbs={false}
                        showStatus={false}
                        interval={3000}
                        swipeable
                        emulateTouch
                        showIndicators={true}
                    >
                        <div className="relative h-[430px] w-full">
                            <img
                                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                                alt="Viagens com desconto"
                                className="object-cover h-full w-full"
                            />
                            <div className="absolute inset-0 flex items-center px-10 bg-black/30">
                                <div className="text-left max-w-md">
                                    <h2 className="text-white text-3xl font-bold mb-4">
                                        Até <strong> 40% OFF </strong><br />
                                        para você viajar protegido <br />
                                        para em qualquer destino!
                                    </h2>
                                    <button className="mt-2 bg-[#FB7813] text-white px-5 py-2 rounded hover:bg-orange-600 transition">
                                        Faça sua cotação
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[430px] w-full">
                            <img
                                src="https://images.pexels.com/photos/14173799/pexels-photo-14173799.jpeg?_gl=1*jdnzjl*_ga*MTAzOTkxNjA0NC4xNzIzMTYxNzgy*_ga_8JE65Q40S6*czE3NTc4OTE5NTIkbzI1JGcxJHQxNzU3ODkyNTkxJGo1NSRsMCRoMA.."
                                alt="Banner 2"
                                className="object-cover h-full w-full"
                            />
                            <div className="absolute inset-0 flex items-center px-10 bg-black/30">
                                <div className="text-left max-w-md">
                                    <h2 className="text-white text-3xl font-bold mb-4">
                                        Descubra os nossos melhores pacotes de seguros!
                                    </h2>
                                    <button className="mt-2 bg-[#FB7813] text-white px-5 py-2 rounded hover:bg-orange-600 transition">
                                        Ver ofertas
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[430px] w-full">
                            <img
                                src="https://images.pexels.com/photos/826349/pexels-photo-826349.jpeg?_gl=1*t7s8m1*_ga*MTAzOTkxNjA0NC4xNzIzMTYxNzgy*_ga_8JE65Q40S6*czE3NTc4OTE5NTIkbzI1JGcxJHQxNzU3ODkyNzM2JGo3JGwwJGgw"
                                alt="Banner 3"
                                className="object-cover h-full w-full"
                            />
                            <div className="absolute inset-0 flex items-center px-10 bg-black/30">
                                <div className="text-left max-w-md">
                                    <h2 className="text-white text-3xl font-bold mb-4">
                                        Planeje suas viagens com tranquilidade
                                        com a Rota segura!
                                    </h2>
                                    <button className="mt-2 bg-[#FB7813] text-white px-5 py-2 rounded hover:bg-orange-600 transition">
                                        Confira destinos
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>

                <section className="py-16">
                    <h2 className="text-3xl font-bold text-[#0D572D] mb-12 text-center">O que oferecemos</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                        {[
                            {
                                icon: <FaPlane className="text-4xl text-[#FB7813] mb-3" />,
                                front: 'Passagens Aéreas',
                                back: 'Voos com os melhores preços para destinos nacionais e internacionais.',
                            },
                            {
                                icon: <FaHotel className="text-4xl text-[#FB7813] mb-3" />,
                                front: 'Hospedagens',
                                back: 'Parcerias com hotéis e pousadas para seu conforto e segurança.',
                            },
                            {
                                icon: <FaTags className="text-4xl text-[#FB7813] mb-3" />,
                                front: 'Descontos Exclusivos',
                                back: 'Ofertas especiais para quem contrata nosso seguro viagem.',
                            },
                            {
                                icon: <FaHeadset className="text-4xl text-[#FB7813] mb-3" />,
                                front: 'Atendimento 24h',
                                back: 'Suporte disponível antes, durante e depois da sua viagem.',
                            },
                        ].map((card, index) => (
                            <div key={index} className="group [perspective:1000px]">
                                <div className="relative h-64 w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                    {/* Frente */}
                                    <div className="absolute inset-0 bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-center p-6 backface-hidden">
                                        {card.icon}
                                        <h3 className="text-lg font-semibold text-[#0D572D]">{card.front}</h3>
                                    </div>

                                    {/* Verso */}
                                    <div className="absolute inset-0 bg-[#FB7813] text-white rounded-lg shadow-lg flex items-center justify-center text-center p-6 [transform:rotateY(180deg)] backface-hidden">
                                        <p className="text-sm">{card.back}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quem somos*/}
                <section id="quemsomos" className="py-16 bg-white ">
                    <h2 className="text-3xl font-bold text-[#0D572D] mb-12 text-center">Quem somos</h2>
                    <div className="flex flex-col-reverse md:flex-row items-center gap-10" data-aos="fade-up">

                        {/* Texto */}
                        <div className="md:w-1/2">

                            <p className="text-gray-700 text-lg leading-relaxed">
                                Somos especialistas em seguro viagem completo — muito além das coberturas básicas. <br /><br />
                                Oferecemos assistência médica, proteção para bagagens, reembolso por cancelamentos, suporte em caso de perda de documentos e até cobertura para compra de eletrônicos no exterior. <br /><br />
                                Viaje com a tranquilidade de saber que, onde quer que esteja, você está protegido.
                            </p>
                        </div>

                        <div className="md:w-1/2 flex justify-center" data-aos="zoom-in">
                            <img
                                src="https://images.unsplash.com/photo-1502920917128-1aa500764ce7"
                                alt="Equipe viajando"
                                className="rounded-lg shadow-lg w-full h-auto max-h-[300px] object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Nossa equipe */}
                {/* <section className="py-16">
                    <h2 className="text-3xl font-bold text-[#0D572D] mb-4">Nossa equipe</h2>
                    <p className="text-gray-700 text-lg max-w-3xl">
                        Nossa equipe é formada por especialistas em turismo com ampla experiência no mercado. Trabalhamos
                        com empatia, eficiência e dedicação para que sua jornada seja inesquecível.
                    </p>
                </section> */}
            </div>
        </>
    );
};

export default Home;
