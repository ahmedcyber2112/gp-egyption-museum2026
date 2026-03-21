import Image from "next/image";
import Hero from "../../components/Hero/Hero";
import VirtualCurator from "../../components/VirtualCurator/VirtualCurator";
import Smart_Museum from "../../components/Smart Dashboard/Smart_Museum";
import PharaohLegacy from "../../components/PharaohLegacy/PharaohLegacy";
import FeaturedArtifacts from "../../components/FeaturedArtifacts/FeaturedArtifacts";
import ServicesCTA from "../../components/ServicesCTA/ServicesCTA";

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
