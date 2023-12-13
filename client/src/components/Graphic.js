import { Image, Flex } from 'antd';
import graphic from "./images/Graphic-cover.svg"

function Graphic() {
    return (
        <Flex justify={"center"} align={"center"} flex={1}>
            <Image
                src={graphic}
            />
        </Flex>
    );
}

export default Graphic;
