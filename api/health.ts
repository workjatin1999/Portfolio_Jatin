interface ApiRequest {
  method?: string;
}

interface ApiResponse {
  status: (code: number) => {
    json: (body: unknown) => void;
  };
}

export default function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ok: false, error: 'Method not allowed'});
    return;
  }

  res.status(200).json({status: 'ok', service: 'jatin-portfolio'});
}
