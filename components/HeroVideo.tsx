import HeroVideoDialog from "@/components/ui/video-dialog";

export default function HeroVideo() {
  return (
    <div id="demo" className="max-w-6xl mx-auto px-4 lg:px-0 pb-28 scroll-m-24">
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
