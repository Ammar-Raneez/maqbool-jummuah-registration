import React, { useEffect, useState } from 'react'
import { ContactFormWrapper } from './ContactForm.styles'
import { Form, Input, Button, Card, Row, Col, Space, Menu, Dropdown, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import db from '../../firebase';
import 'antd/dist/antd.css';
import axios from '../../axios';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const MOBILE_REGEX = /^([0-9]!*){10,}$/;

export const ContactForm = () => {
    const [showModal, setShowModal] = useState(false);

    //will hold the total counts
    const [jammaathOneCount, setJamaathOneCount] = useState<number>(0);
    const [jammaathTwoCount, setJamaathTwoCount] = useState<number>(0);
    const [jammaathThreeCount, setJamaathThreeCount] = useState<number>(0);

    //will just be a temporary flag to toggle current counts
    const [currentJammaathOne, setCurrentJamaathOne] = useState<number>(0);
    const [currentJammaathTwo, setCurrentJamaathTwo] = useState<number>(0);
    const [currentJammaathThree, setCurrentJamaathThree] = useState<number>(0);

    const [activeChoice, setActiveChoice] = useState<string>()
    const [idNum, setIdNum] = useState<string>("");
    const [email, SetEmail] = useState<string>("");
    const [mobileNum, setMobileNum] = useState<number>(0);
    const [fullName, SetFullName] = useState<string>("");
    const [form] = Form.useForm();

    useEffect(() => {
        //refetch counts
        db.collection("Jamaath Counts")
        db.collection("Jamaath Counts")?.onSnapshot(snapshot => {
            if (snapshot.docs.length > 0) {
                setJamaathOneCount(snapshot.docs[0]?.data()['Jamaath 1']);
                setJamaathTwoCount(snapshot.docs[0]?.data()['Jamaath 2']);
                setJamaathThreeCount(snapshot.docs[0]?.data()['Jamaath 3']);
            }
        })
    }, [jammaathOneCount, jammaathTwoCount, jammaathThreeCount])


    const handleJamaathOneChange = () => {
        setActiveChoice("Jamaath 1")
        setCurrentJamaathOne(1);
        setCurrentJamaathTwo(0);
        setCurrentJamaathThree(0);
    }

    const handleJamaathTwoChange = () => {
        setActiveChoice("Jamaath 2")
        setCurrentJamaathOne(0);
        setCurrentJamaathTwo(1);
        setCurrentJamaathThree(0);
    }

    const handleJamaathThreeChange = () => {
        setActiveChoice("Jamaath 3")
        setCurrentJamaathOne(0);
        setCurrentJamaathTwo(0);
        setCurrentJamaathThree(1);
    }

    const jamaathOptions = () => (
        <Menu>
            {(jammaathOneCount < 50 || jammaathOneCount === undefined) && 
                <Menu.Item key="0">
                    <a onClick={handleJamaathOneChange}>Jamaath 1</a>
                </Menu.Item>
            }
            <Menu.Divider />
            {(jammaathTwoCount < 50 || jammaathOneCount === undefined) && 
                <Menu.Item key="1">
                    <a onClick={handleJamaathTwoChange}>Jamaath 2</a>
                </Menu.Item>
            }
            <Menu.Divider />
            {(jammaathThreeCount < 50 || jammaathOneCount === undefined) && 
                <Menu.Item key="2">
                    <a onClick={handleJamaathThreeChange}>Jamaath 3</a>
                </Menu.Item>
            }
        </Menu>
    )

    const formSubmission = async (event:any) => {
        setShowModal(false);

        await axios.post("/registration", {
            activeChoice,
            idNum,
            email,
            mobileNum,
            fullName,
            timestamp: new Date().toUTCString()
        })

        // db.collection("Registered")
        // .add({
        //     idNum,
        //     email,
        //     fullName,
        //     mobileNum,
        //     JamaathChoice: activeChoice
        // })

        //jamaath counts stored in firebase
        //jamaath records stored in MongoDB
        //delete all records and reupdate values
        db.collection("Jamaath Counts")
        .get()
        .then(res => res.forEach(element => element.ref.delete()))

        db.collection("Jamaath Counts")
        .add({
            "Jamaath 1": jammaathOneCount + currentJammaathOne,
            "Jamaath 2": jammaathTwoCount + currentJammaathTwo,
            "Jamaath 3": jammaathThreeCount + currentJammaathThree
        })

        form.resetFields();
        setActiveChoice("")
        setIdNum("");
        SetEmail("");
        setMobileNum(0);
        SetFullName("");
    }

    const onIdChange = (event: React.ChangeEvent<HTMLInputElement>) => setIdNum(event.currentTarget.value)
    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => SetEmail(event.currentTarget.value)
    const onMobilNumChange = (event: React.ChangeEvent<HTMLInputElement>) => setMobileNum(parseInt(event.currentTarget.value))
    const onFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => SetFullName(event.currentTarget.value)

    return (
        <ContactFormWrapper>
            <Form onFinish={() => setShowModal(true)} requiredMark={false} colon={false} form={form}>
                <h1>Maqbool Jumuah Registration</h1>
                <Space />
                <Form.Item
                    label="Terms and Conditions"
                    name="tac"
                >
                    <p>
                        Please note that registration is compulsory to enter the Masjid
                        Children below the age of 15 will not be allowed to enter.
                        Your own prayer mat and mask is compulsory.
                        If you registered and didn't receive a token number via SMS means you have not been selected due to the slots being full.
                        A valid ID Number is required (If invalid, your registration will be revoked)
                        You will have to show the SMS with the confirmed details you receive at the entry checkpoint.
                        Double entries will be cancelled as its only 1 token per person.
                        Please double check the details you submit as if it is invalid then you will not receive the token even though 
                        you have been selected. Please do not submit your application twice; if you did, your entire registration would be revoked.
                    </p>
                </Form.Item>
                <Form.Item
                    label="NIC/Passport Number"
                    name="idNum"
                    rules={[{ required: true, message: "Please input your ID Number" }]}
                >
                    <Input allowClear value={idNum} onChange={onIdChange} />
                </Form.Item>
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={
                        [{ required: true, message: "Please input your email" }, 
                        {pattern: EMAIL_REGEX, message: "Please enter a valid E-mail" }
                    ]}
                >
                    <Input allowClear value={email} onChange={onEmailChange} />
                </Form.Item>
                <Form.Item
                    label="Mobile Number"
                    name="mobileNum"
                    rules={
                        [{ required: true, message: "Please input your Mobile Number"}, 
                        {pattern: MOBILE_REGEX, message: "Please enter a valid Mobile Number" }
                    ]}
                >
                    <Input allowClear value={mobileNum} onChange={onMobilNumChange} />
                </Form.Item>
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: "Please input your Full Name"}]}
                >
                    <Input allowClear value={fullName} onChange={onFullNameChange} />
                </Form.Item>
                <Form.Item
                    label="Jamaath Timings"
                    name="jamaathTimings"
                >   
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Col>
                            <Card 
                                bodyStyle={{ 
                                    textAlign: 'center', 
                                    borderRadius: '0px 0px 10px 10px', 
                                    backgroundColor: "#9AC1BC", 
                                    color: '#fff' 
                                }}
                                headStyle={{ 
                                    fontSize: '1.5rem', 
                                    borderRadius: '10px 10px 0px 0px', 
                                    textAlign: 'center', 
                                    backgroundColor: "#9AC1BC", 
                                    color: '#fff' 
                                }} 
                                title="Jamaath 1" 
                            >
                                <span style={{ fontWeight: 'bold' }}>Gates Open at</span> - 12:10<br />
                                <span style={{ fontWeight: 'bold' }}>Kuthuba</span> - 12:30<br />
                                <span style={{ fontWeight: 'bold' }}>Namaaz</span> - 12:45
                            </Card>
                        </Col>
                        <Col>
                            <Card 
                                bodyStyle={{ 
                                    textAlign: 'center', 
                                    borderRadius: '0px 0px 10px 10px', 
                                    backgroundColor: '#71ADB5', 
                                    color: '#fff' 
                                }}
                                headStyle={{ 
                                    fontSize: '1.5rem', 
                                    borderRadius: '10px 10px 0px 0px', 
                                    textAlign: 'center', 
                                    backgroundColor: '#71ADB5', 
                                    color: '#fff' 
                                }} 
                                title="Jamaath 2" 
                            >
                                <span style={{ fontWeight: 'bold' }}>Gates Open at</span> - 12:50<br />
                                <span style={{ fontWeight: 'bold' }}>Kuthuba</span> - 13:00<br />
                                <span style={{ fontWeight: 'bold' }}>Namaaz</span> - 13:15
                            </Card>
                        </Col>
                        <Col>
                            <Card 
                                bodyStyle={{ 
                                    textAlign: 'center', 
                                    borderRadius: '0px 0px 10px 10px', 
                                    backgroundColor: '#016A70', 
                                    color: '#fff' 
                                }}
                                headStyle={{ 
                                    fontSize: '1.5rem', 
                                    borderRadius: '10px 10px 0px 0px', 
                                    textAlign: 'center', 
                                    backgroundColor: '#016A70', 
                                    color: '#fff' 
                                }} 
                                title="Jamaath 3" 
                            >
                                <span style={{ fontWeight: 'bold' }}>Gates Open at</span> - 13:20<br />
                                <span style={{ fontWeight: 'bold' }}>Kuthuba</span> - 13:30<br />
                                <span style={{ fontWeight: 'bold' }}>Namaaz</span> - 13:45
                            </Card>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    label="Jamaath Options"
                    name="Jamaath Options"
                >
                    <Dropdown overlay={jamaathOptions} trigger={['click']}>
                        <Button style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{activeChoice}</span>
                            <span><DownOutlined /></span>
                        </Button>
                    </Dropdown>
                </Form.Item>
                <Form.Item>
                    <div className="contactUs__formBtn">
                        {(jammaathOneCount === 50 && jammaathTwoCount === 50 && jammaathThreeCount === 50) ||
                            (!activeChoice || !idNum || !email || !mobileNum || !fullName)
                            ? (
                            <Button disabled style={{ width: '100%' }} htmlType="submit" type="primary">CONFIRM</Button>
                        ) : (
                            <Button style={{ width: '100%' }} htmlType="submit" type="primary">CONFIRM</Button>
                        )}
                    </div>
                </Form.Item>
            </Form>
            <Modal centered visible={showModal}  title="Your response has been recorded" onOk={formSubmission} onCancel={formSubmission}>
                <p>Assalamu Alaikum {fullName}, your response has been recorded</p>
            </Modal>
        </ContactFormWrapper>
    )
}
