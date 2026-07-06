/**
 * JsonLd — injeta um grafo schema.org como <script type="application/ld+json">.
 * -------------------------------------------------------------
 * Renderizado no servidor (RSC). Serializa o objeto ja montado em
 * lib/jsonld.ts. Usar dangerouslySetInnerHTML e o padrao recomendado
 * pelo Next para structured data.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Conteudo controlado por nos (sem entrada de usuario): seguro.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
