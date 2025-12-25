import { Box, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { RiArrowUpDoubleFill } from "react-icons/ri";

export default function ScrollupBtn({ scrollContainerRef }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      setIsVisible(container.scrollTop > 200);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    scrollContainerRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        m: 3.2,
        position: "fixed",
        bottom: 55,
        right: 0,
        zIndex: 3,
      }}
    >
      <Fab color="primary" size="medium" onClick={scrollToTop}>
        <RiArrowUpDoubleFill className="text-2xl" />
      </Fab>
    </Box>
  );
}
