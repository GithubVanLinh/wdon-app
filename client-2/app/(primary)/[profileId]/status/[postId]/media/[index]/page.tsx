export interface PageProps {
  params: any;
}

export default function Page({ params }: Readonly<PageProps>) {
  return <div>Hide page: {JSON.stringify(params)}</div>;
}
