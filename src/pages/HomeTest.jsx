import React, { useState } from "react";
import {
  Typography,
  Switch,
  Input,
  Space,
  ConfigProvider,
  Collapse,
  Card,
  Button,
} from "antd";
import { MessageOutlined } from "@ant-design/icons";
import Nav from "../components/Nav";
import { createQueryString } from "../utils";
import { useNavigate } from "react-router-dom";
import PopularProperties from "../components/PopularProperties";

const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;

const HomeTest = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({type: "rent", location: ""});
    const pageTheme = {
        token: {
            colorPrimary: '#fa541c',
        },
    };
  const serviceValuesCollapseData = [
    {
      key: "1",
      label: "Best rates in the market",
      children: <p>We provide the best rates in the market</p>,
    },
    {
      key: "2",
      label: "Security of your data",
      children: (
        <p>
          We handle your data and take your privacy very seriously and handle it
          carefully.
        </p>
      ),
    },
    {
      key: "3",
      label: "Prevent unstable prices",
      children: (
        <p>
          We guarantee that what you see is what you get, and no hidden charges
          or cost whatsoever.
        </p>
      ),
    },
  ];
    const handleSearch = values => {
        // Filter keys with non-empty values
        const searchParams = Object.keys(values).reduce((params, key) => {
          if (values[key]) {
            params[key] = values[key];
          }
    
          return params;
        }, {});
    
        // Check if the searchParams object is empty
        const isEmpty = Object.keys(searchParams).length === 0;
    
        if (isEmpty) {
          // If searchParams object is empty, navigate to '/listing' without query parameters
          navigate("/listing");
        } else {
          const getQueryParams = createQueryString(searchParams);
          navigate(`/listing?${getQueryParams}`);
        }
      };

  return (
    <ConfigProvider theme={pageTheme}>
      <Nav />
      <div className="hero-section">
        <div className="hero-section-video-wrapper">
          <video autoPlay loop muted>
            <source src="src\assets\hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-section-content">
          <div className="hero-heading-wrapper">
            <Title>Discover the most suitable property</Title>
            <Paragraph>
              Find a variety of properties that suit you hassle-free, forget all
              difficulties in finding the perfect home.
            </Paragraph>
            <Space direction='horizontal' style={{ width: '100%', margin: '30px 0' }} size={20}>
                                <Switch
                                    checked={values.type === "rent"}
                                    checkedChildren="Rent"
                                    unCheckedChildren="Sale"
                                    onChange={e => setValues({ ...values, type: values.type==="rent"?"sale":"rent"})}
                                />
                                <Search
                                    placeholder="Search Location"
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                    onChange={e => setValues({ ...values, location: e.target.value })}
                                    onSearch={() => handleSearch(values)}
                                    style={{ width: 500 }}
                                />
                            </Space>
          </div>
          <div className="hero-sideimage-wrapper">
            <img alt="" src="src/assets/sideimage-one.jpg" width={450} />
          </div>
        </div>
      </div>
      <div className="mx-auto my-0 max-w-7xl px-16 py-5">
        <PopularProperties />
      </div>
      <section id="service-values">
        <div className="service-values-centering-wrapper">
          <div className="service-values-sideimage-wrapper">
            <img alt="" src="/src/assets/sideimage-two.jpg" width={400} />
          </div>
          <div className="service-values-content-wrapper">
            <Title level={5}>Our value</Title>
            <Title style={{ marginTop: "10px" }}>Value we give to you</Title>
            <Text>
              We are always ready to help by providing the best services, we
              believe that a good place to live can make your life better.
            </Text>
            <Collapse
              defaultActiveKey={["1"]}
              items={serviceValuesCollapseData}
              showArrow={false}
              style={{ marginTop: "30px" }}
            />
          </div>
        </div>
      </section>
      <section id="contact-us">
        <div className="service-values-centering-wrapper">
          <div className="contact-us-content-wrapper">
            <Title level={5}>Contact Us</Title>
            <Title style={{ marginTop: "10px" }}>It's easy to reach us</Title>
            <Text>
              We are always ready to help by providing the best services, we
              believe that a good place to live can make your life better.
            </Text>
            <Card style={{ marginTop: "40px" }}>
              <Space
                align="baseline"
                direction="horizontal"
                style={{ alignItems: "center" }}
              >
                <div>
                  <MessageOutlined
                    style={{ color: "#1F3E72", fontSize: "24px " }}
                  />

                </div>
                <Title level={4} style={{ margin: 0 }}>
                  Message Us
                </Title>
              </Space>
              <div style={{ marginTop: "20px" }}>
                <Button size="large" type="primary">
                  Send a message
                </Button>
              </div>
            </Card>
          </div>
          <div className="service-values-sideimage-wrapper">
            <img alt="" src="/src/assets/sideimage-three.avif" width={400} />
          </div>
        </div>
      </section>
      <section id="get-started">
        <div className="get-started-centering-wrapper">
          <div className="get-started-content-background-wrap">
            <Title>Get started with Casa.</Title>
            <Text>
              Subscribe and find super attractive price quotes from us, Find the
              perfect house for you.
            </Text>
            <div className="get-started-button-wrapper">
              <Button size="large">Get Started</Button>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="footer-centering-wrapper">
          <div className="footer-main-content">
            <div className="footer-logo-column">
              <Title>casa.</Title>
              <Paragraph>Find the perfect house hassle-free.</Paragraph>
            </div>
            <div className="footer-links-column">
              <Space size="large">
                <Space direction="vertical">
                  <Title level={5}>About</Title>
                  <Link>Our Values</Link>
                  <Link>Contact Us</Link>
                </Space>
                <Space direction="vertical">
                  <Title level={5}>Explore</Title>
                  <Link>Login</Link>
                  <Link>Find properties</Link>
                </Space>
              </Space>
            </div>
          </div>
          <div className="footer-copyright-wrapper">
            <Paragraph>@2023 casa. All rights reserved</Paragraph>
          </div>
        </div>
      </footer>
    </ConfigProvider>
  );
};

export default HomeTest;
