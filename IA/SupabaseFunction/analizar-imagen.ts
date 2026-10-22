const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return Response.json(
      { error: "Método no permitido" },
      { status: 405, headers: corsHeaders },
    );
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey) {
      return Response.json(
        { error: "Falta configurar GEMINI_API_KEY" },
        { status: 500, headers: corsHeaders },
      );
    }

    const { imageBase64, mimeType } = await req.json();

    if (
      typeof imageBase64 !== "string" ||
      !imageBase64 ||
      typeof mimeType !== "string"
    ) {
      return Response.json(
        { error: "Debes enviar una imagen y su tipo MIME" },
        { status: 400, headers: corsHeaders },
      );
    }

    const tiposPermitidos = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!tiposPermitidos.includes(mimeType)) {
      return Response.json(
        { error: "Formato de imagen no admitido" },
        { status: 400, headers: corsHeaders },
      );
    }

    const respuesta = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: "Describe brevemente esta imagen.",
              },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: imageBase64,
                },
              },
            ],
          }],
        }),
      },
    );

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      console.error("Error de Gemini:", resultado);

      return Response.json(
        { error: "No se pudo analizar la imagen" },
        { status: 502, headers: corsHeaders },
      );
    }

    const analisis =
      resultado.candidates?.[0]?.content?.parts
        ?.map((parte: { text?: string }) => parte.text ?? "")
        .join("") ?? "";

    if (!analisis) {
      return Response.json(
        { error: "Gemini no devolvió un análisis" },
        { status: 502, headers: corsHeaders },
      );
    }

    return Response.json(
      { analisis },
      { headers: corsHeaders },
    );
  } catch (error) {
    console.error("Error en analizar-imagen:", error);

    return Response.json(
      { error: "Ocurrió un error al procesar la solicitud" },
      { status: 500, headers: corsHeaders },
    );
  }
});
