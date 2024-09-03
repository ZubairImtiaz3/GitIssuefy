import HeroVideoDialog from "@/components/ui/video-dialog";

export default function HeroVideo() {
  return (
    <div className="max-w-screen-lg mx-auto px-8 lg:px-0 pb-28">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://drive.google.com/file/d/1oXT_nq_ODd9isANwcZioTdq6Umyx39oO/preview"
        thumbnailSrc="https://lh3.googleusercontent.com/d/1mZfLzvHma0uGU9mmlmRcr8vzMMnAtDlJ"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
