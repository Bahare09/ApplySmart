import { Image, Flex, Grid } from 'antd';
import graphic from "./images/Graphic-cover.svg";
const {useBreakpoint} = Grid


function Graphic() {
    const breakpoints = useBreakpoint()
 
    return (
        <Flex justify={"center"} align={breakpoints.md & !breakpoints.xl? "end" : "center" } flex={1}>
            <Image
                src={graphic}
            />
        </Flex>
    );
}

export default Graphic;
