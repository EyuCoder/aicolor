import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { imageUrl } = await request.json();
  console.log('got img', imageUrl);

  let response = await fetch(`${process.env.REPLICATE_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + process.env.REPLICATE_API_TOKEN,
    },
    body: JSON.stringify({
      version:
        '94a9ed3bf283fcd3950a04a5cc2fba3588baec1a0843921ef8028934406827e6',
      input: {
        image: imageUrl,
      },
    }),
  });

  let data = await response.json();
  let endpointUrl = data.urls.get;

  let generatedImage: string | null = null;
  while (!generatedImage) {
    console.log('polling for result...');

    let finalResponse = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + process.env.REPLICATE_API_TOKEN,
      },
    });

    let generationStatus = await finalResponse.json();

    if (generationStatus.status === 'succeeded') {
      generatedImage = generationStatus.output;
    } else if (generationStatus.status === 'failed') {
      return NextResponse.json('Failed colorizing the image', { status: 500 });
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log('restored image: ', generatedImage);
  return NextResponse.json(
    generatedImage ? generatedImage : 'Failed colorizing the image',
    { status: generatedImage ? 500 : 500 }
  );
}
