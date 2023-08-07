import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { imageUrl } = await request.json();

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
  return NextResponse.json(data.urls.get);
}
