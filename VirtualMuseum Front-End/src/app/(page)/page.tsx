import dynamic from "next/dynamic";

const Hero = dynamic(() => import("../../components/Hero/Hero"), {
  loading: () => <div className="h-screen bg-[#050505] animate-pulse" />,
});

const Smart_Museum = dynamic(() => import("../../components/Smart Dashboard/Smart_Museum"), {
  loading: () => <div className="py-24 bg-[#080808] animate-pulse" />,
});
const PharaohLegacy = dynamic(() => import("../../components/PharaohLegacy/PharaohLegacy"), {
  loading: () => <div className="py-28 bg-white animate-pulse" />,
});
const FeaturedArtifacts = dynamic(() => import("../../components/FeaturedArtifacts/FeaturedArtifacts"), {
  loading: () => <div className="py-32 bg-[#050505] animate-pulse" />,
});
const ServicesCTA = dynamic(() => import("../../components/ServicesCTA/ServicesCTA"), {
  loading: () => <div className="py-24 bg-white animate-pulse" />,
});
const VirtualCurator = dynamic(() => import("../../components/VirtualCurator/VirtualCurator"), {
  loading: () => <div className="py-24 bg-[#050505] animate-pulse" />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Smart_Museum />
      <PharaohLegacy />
      <FeaturedArtifacts />
      <ServicesCTA />
      <VirtualCurator />
    </>
  );
}
