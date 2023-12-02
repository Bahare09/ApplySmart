import { Tabs, Flex, Typography } from "antd"
const { Title } = Typography
export const TailoredVersion = ({ cv, coverLetter }) => {
    console.log(cv)

    return <Flex vertical>
        <Title level={4}>
            The tailor CV and cover letter
        </Title>

        <Tabs
            defaultActiveKey="1"
            type="card"
            size={"middle"}
            items={[{
                label: "CV",
                key: "1",
                children: cv.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)
            }
                ,
            {
                label: "Cover letter",
                key: "2",
                children: coverLetter.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)

            }]
            }
        />



    </Flex>

}