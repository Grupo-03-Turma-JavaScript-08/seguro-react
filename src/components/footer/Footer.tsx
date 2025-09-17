export default function Footer() {
  return (
    <footer className="bg-[#072B28] text-[#ffffff] py-12 px-[10%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Quem Somos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quem Somos</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#equipe" className="hover:underline">Nossa Equipe</a></li>
            <li><a href="#oferecemos" className="hover:underline">o que oferecemos</a></li>
            <li><a href="#quemsomos" className="hover:underline">Sobre a Empresa</a></li>
          </ul>
        </div>

        {/* Nossos Planos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Nossos Planos</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#plano-anual" className="hover:underline">Anual</a></li>
            <li><a href="#plano-mensal" className="hover:underline">Mensal</a></li>
            <li><a href="#plano-temporada" className="hover:underline">Temporada</a></li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://instagram.com" target="_blank" className="hover:underline">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" className="hover:underline">Facebook</a></li>
            <li><a href="https://tiktok.com" target="_blank" className="hover:underline">TikTok</a></li>
          </ul>
        </div>

        {/* Contatos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contatos</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+551199999999" className="hover:underline" title="🐀">(11) 3224-4000</a></li>
            <li><a href="tel:+551198888888" className="hover:underline" title="🎮" >(11) 4002-8922</a></li>
            <li><a href="tel:+551197777777" className="hover:underline">(11) 97777-7777</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-[#FB7813]">
        © {new Date().getFullYear()} Rota Segura. Todos os direitos reservados.
      </div>
    </footer>
  );
}
