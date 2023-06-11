export interface YoutubeProps {
  title: string;
  uid: string;
}

export function Youtube({ title, uid }: YoutubeProps) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${uid}`}
      width="100%"
      height="500px"
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    />
  );
}

export default Youtube;
