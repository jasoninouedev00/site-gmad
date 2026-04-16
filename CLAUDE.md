# GMAD - Site Institucional

## Sobre o Projeto
Site institucional do Grupo GMAD (Grupo Madcompen) - rede especializada em materiais para marcenaria.
Repositorio: https://github.com/jasoninouedev00/site-gmad

## Stack
- HTML5 / CSS3 / JavaScript vanilla (sem frameworks)
- Google Fonts (Nunito Sans)
- Servidor local: `npx serve . -l 3000`

## Estrutura do Projeto
```
site-gmad/
  index.html            # Pagina home
  css/
    variables.css       # Design tokens (cores, espacamentos, tipografia)
    base.css            # Reset, utilitarios, botoes, animacoes
    components.css      # Componentes (navbar, hero, cards, footer, responsivo)
  js/
    main.js             # Scroll reveal, navbar, menu mobile, particulas, counters
  assets/
    img/                # Imagens do site
    icons/              # Icones customizados
  exemplos/             # Material de referencia (NAO vai pro git)
    bola-da-vez-3.html  # Exemplo de landing page GMAD (design reference)
    Manual_da_Marca_GMAD.pdf
    manual_exportado/   # Paginas do manual em PNG (p01-p75)
```

## Identidade Visual (Manual da Marca)

### Cores Oficiais
| Cor | Hex | Pantone | Uso |
|-----|-----|---------|-----|
| Verde GMAD | `#1C6734` | 7483C | Cor primaria, logo, CTAs, destaques |
| Laranja/Vermelho GMAD | `#E76041` | 166C | Cor de acento, logo (detalhe do "A") |
| Cinza 70% | `#4D4D4D` | - | Versao monocromatica |
| Cinza 50% | `#808080` | - | Versao monocromatica |

### Tipografia
- **Institucional:** Frutiger LT Std (fonte paga, nao usada na web)
- **Web/Digital:** Nunito Sans (Google Fonts) como substituta
- **Fallbacks:** Trebuchet MS, Calibri, sans-serif

### Slogan
- **Oficial:** "Tudo para Moveis"
- Alternativas aprovadas: "Tudo para o Marceneiro", "Tudo para Marcenaria", "Rede Especializada em Marcenaria"
- NAO criar slogans diferentes desses

### Missao
"Oferecer a mais completa linha de produtos e servicos na producao de moveis, atendendo plenamente as demandas dos projetos de profissionais da area e dos consumidores finais, garantindo criacao de valor e a sustentabilidade da cadeia."

### Visao
"Ser uma marca reconhecida e admirada pela solidez, inovacao, eficiencia e responsabilidade social."

### Valores
- Integridade
- Trabalho e Comprometimento
- Proximidade do cliente e valorizacao das relacoes
- Empreendedorismo
- Sustentabilidade

### Logo
- "GM" em verde escuro, "A" com detalhe laranja/vermelho, "D" em verde escuro
- Versoes: colorida, escala de cinza, traco positivo (preto), traco negativo (branco)
- Presidente: Jose Alvaro Goes Filho (Associacao lojas Grupo Madcompen)

## Design System (CSS Variables)
As variaveis estao em `css/variables.css`. Ao criar novas paginas, sempre usar as variaveis:
- `--primary` / `--primary-bright` / `--primary-dark` para verde
- `--accent` / `--accent-dark` para laranja
- `--bg` / `--bg-alt` para fundos escuros
- `--fg` / `--fg-muted` para texto
- `--gradient-cta` para botoes principais
- `--gradient-card` para cards

## Padroes de Codigo
- CSS modular: variables.css > base.css > components.css
- Classes utilitarias: `.text-gradient-green`, `.text-gradient-accent`, `.fade-up`, `.section-pad`
- Animacoes via IntersectionObserver (`.fade-up` + `.visible`)
- Mobile-first responsivo com breakpoints em 480px, 768px, 1024px
- Icones via SVG inline (sem dependencia externa)

## Git
- `.gitignore` exclui `exemplos/` (arquivos grandes do manual e exemplos)
- Conta GitHub: jasoninouedev00
- Branch principal: main

## Proximos Passos Potenciais
- Adicionar imagens reais do deposito/produtos GMAD
- Pagina de catalogo de produtos
- Integracao com WhatsApp Business real
- Pagina "Sobre Nos" expandida com trajetoria
- SEO e Open Graph tags
- Deploy (GitHub Pages, Vercel ou Netlify)
