import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../App.css'
import { FaHeadset, FaHeartbeat, FaShieldAlt, FaSuitcaseRolling } from 'react-icons/fa';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import luis from '../../assets/img/Luis.jpg'
import dayse from '../../assets/img/dayse.jpg'
import vitor from '../../assets/img/vitor.jpg'
import miguel from '../../assets/img/miguel.jpg'
import maeli from '../../assets/img/maeli.jpeg'
import leticia from '../../assets/img/leticia.jpg'

const Home = () => {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <>
            {/* Carrossel */}
            <div className="pt-36 px-[10%]">
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
                                        40% OFF em <br />
                                        viagens nacionais <br />
                                        e internacionais
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
                                        Descubra os melhores pacotes de viagens!
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
                                        Planeje agora sua próxima aventura
                                    </h2>
                                    <button className="mt-2 bg-[#FB7813] text-white px-5 py-2 rounded hover:bg-orange-600 transition">
                                        Confira destinos
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>


                <section id="quemsomos" className="py-16 bg-white ">
                    <h2 className="text-3xl font-bold text-[#0D572D] mb-12 text-center">Quem somos?</h2>
                    <div className="flex flex-col-reverse md:flex-row items-center gap-10" data-aos="fade-up">
                        <div className="md:w-1/2">

                            <p className="text-gray-700 text-lg leading-relaxed">
                                Somos especialistas em seguro viagem completo — muito além das coberturas básicas. <br /><br />
                                Oferecemos assistência médica, proteção para bagagens, reembolso por cancelamentos, suporte em caso de perda de documentos e até cobertura para compra de eletrônicos no exterior. <br /><br />
                                Viaje com a tranquilidade de saber que, onde quer que esteja, você está protegido.
                            </p>
                        </div>

                        <div className="md:w-1/2 flex justify-center" data-aos="zoom-in">
                            <img
                                src="https://media.istockphoto.com/id/1342270284/pt/foto/group-of-confident-young-people-in-smart-casual-wear.jpg?s=612x612&w=0&k=20&c=QUisIX09d8RzNIbl3cVaidfn6LjwRLbu-wI1HB-qT4w="
                                alt="oioioioi"
                                className="rounded-lg shadow-lg w-full h-auto max-h-[300px] object-cover"
                            />
                        </div>
                    </div>
                </section>

                <section id="oferecemos" className="pb-16">
                    <h2 className="text-3xl font-bold text-[#0D572D] mb-12 text-center tracking-wide">
                        O que oferecemos?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
                        {[
                            {
                                icon: <FaShieldAlt className="text-5xl text-[#4a6572] mb-4" />,
                                front: 'Cobertura Completa',
                                back: `Proteção contra imprevistos durante a viagem, incluindo assistência médica, acidentes e despesas emergenciais.\n\nViaje tranquilo sabendo que está protegido contra diversos riscos.`,
                            },
                            {
                                icon: <FaHeartbeat className="text-5xl text-[#4a6572] mb-4" />,
                                front: 'Assistência Médica 24h',
                                back: `Atendimento médico internacional disponível a qualquer hora, garantindo suporte imediato em casos de emergência.\n\nSua saúde sempre em primeiro lugar, onde quer que você esteja.`,
                            },
                            {
                                icon: <FaSuitcaseRolling className="text-5xl text-[#4a6572] mb-4" />,
                                front: 'Proteção de Bagagem',
                                back: `Cobertura para extravio, roubo ou danos à bagagem durante o transporte.\n\nSua bagagem protegida para uma viagem sem preocupações.`,
                            },
                            {
                                icon: <FaHeadset className="text-5xl text-[#4a6572] mb-4" />,
                                front: 'Suporte e Atendimento',
                                back: `Assistência 24 horas, com suporte em múltiplos idiomas para ajudar antes, durante e após a viagem.\n\nEstamos sempre disponíveis para o que você precisar.`,
                            },
                        ].map((card, index) => (
                            <div key={index} className="group [perspective:1200px]">
                                <div className="relative h-[300px] w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                    {/* Frente */}
                                    <div
                                        className="absolute inset-0 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-center p-8 backface-hidden"
                                        style={{ backfaceVisibility: 'hidden' }}
                                    >
                                        {card.icon}
                                        <h3 className="text-xl font-semibold text-[#4a6572] tracking-wide">{card.front}</h3>
                                    </div>

                                    {/* Verso */}
                                    <div
                                        className="absolute inset-0 bg-[#FB7813] text-white rounded-xl shadow-lg flex items-center justify-center text-center p-8 [transform:rotateY(180deg)] backface-hidden"
                                        style={{ whiteSpace: 'pre-line', backfaceVisibility: 'hidden' }}
                                    >
                                        <p className="text-base leading-relaxed font-medium">{card.back}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="equipe" className="pb-16 bg-white">
                    <h2 className="text-3xl font-bold text-[#0D572D] mb-12 text-center tracking-wide">
                        Nossa equipe
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {[
                            {
                                nome: 'Maeli',
                                funcao: 'Product Owner',
                                foto: maeli,
                                linkedin: 'https://www.linkedin.com/in/maeli-palharini',
                            },
                            {
                                nome: 'Vitor',
                                funcao: 'Tester',
                                foto: vitor,
                                linkedin: 'https://www.linkedin.com/in/vitor-nazareth',
                            },
                            {
                                nome: 'Miguel',
                                funcao: 'Desenvolvedor',
                                foto: miguel,
                                linkedin: 'https://www.linkedin.com/in/miguel-zua-adao',
                            },
                            {
                                nome: 'Luis',
                                funcao: 'Desenvolvedor',
                                foto: luis,
                                linkedin: 'https://www.linkedin.com/in/luis-henrique-bispo',
                            },
                            {
                                nome: 'Dayse',
                                funcao: 'Desenvolvedora',
                                foto: dayse,
                                linkedin: 'https://www.linkedin.com/in/daysedev',
                            },
                            {
                                nome: 'Leticia',
                                funcao: 'Desenvolvedora',
                                foto: leticia,
                                linkedin: 'https://www.linkedin.com/in/leticiabetman',
                            },
                        ].map((membro, idx) => (
                            <a
                                key={idx}
                                href={membro.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                                    <img
                                        src={membro.foto}
                                        alt={membro.nome}
                                        className={`w-full h-64 object-cover ${membro.nome === 'Luis' ? 'object-[center_10%]' : 'object-[center_20%]'}`}
                                    />
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-semibold text-[#0D572D]">{membro.nome}</h3>
                                        <p className="text-gray-600 mt-1 text-sm">{membro.funcao}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
