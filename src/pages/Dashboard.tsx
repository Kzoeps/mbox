import { Box, SimpleGrid } from "@chakra-ui/react";
import { TbCameraPlus } from "react-icons/tb";
import { AiOutlineFileAdd } from "react-icons/ai";
import { MdOutlineViewList } from "react-icons/md";
import { GrAnalytics } from "react-icons/gr";
import StatsCard from "../components/stats-card";
import { useNavigate } from "react-router-dom";

export interface DashboardProps {}

export const Dashboard = (props: DashboardProps) => {
  const navigate = useNavigate();
  // const inputRef = useRef<HTMLInputElement | null>(null);
  // const { isLoading, setIsLoading } = useLoaderHook();

  // const toast = useToast();
  // const handleAdditionClick = async () => {
    // inputRef.current?.click();
  // };
  // const handleFileSelection = async (event: ChangeEvent<HTMLInputElement>) => {
  //   const uploadedFile = event?.target?.files?.[0];
  //   if (uploadedFile) {
  //     try {
  //       let compressedFile = (await imageCompression(
  //         uploadedFile,
  //         IMAGE_COMPRESSION_OPTIONS
  //       )) as unknown as Blob;
  //       compressedFile = new File([compressedFile], uploadedFile.name, {
  //         type: compressedFile.type,
  //       });
  //       setIsLoading(true);
  //       const rawText = await readScreenShot(compressedFile as File);
  //       const extractedData = extractOCRData(rawText);
  //       navigate("/add-record", {
  //         state: extractedData,
  //       });
  //     } catch (e: any) {
  //       toast({ title: e?.message || e, status: "error", isClosable: true });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  return (
    <>
      <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            onClick={() => navigate("/capture")}
            stat={"Capture Payment"}
            icon={<TbCameraPlus size={"3em"} />}
          />
          <StatsCard
            onClick={() => navigate(`/records`)}
            stat={"View Payments"}
            icon={<MdOutlineViewList size={"3em"} />}
          />
          <StatsCard
            onClick={() => navigate(`/add-record`)}
            stat={"Add Payment"}
            icon={<AiOutlineFileAdd size={"3em"} />}
          />
          <StatsCard
            onClick={() => navigate(`/analytics`)}
            stat={"Analytics"}
            icon={<GrAnalytics size={"3em"} />}
          />
          {/* <input
            onChange={handleFileSelection}
            ref={inputRef}
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            capture="environment"
          />
          {isLoading && (
            <div className={"spinner_overlay"}>
              <Spinner
                className={"spinner"}
                thickness="7px"
                speed="0.65s"
                emptyColor="gray.200"
                color="orange.500"
                size="xl"
              />
            </div>
          )} */}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Dashboard;
