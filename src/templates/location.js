import React, {useState, useEffect, useContext} from 'react';
import {Card} from '../components/Card'
import ChooseProgram from '../components/ChooseProgram'
import {Container, Row, Column, Wrapper, WrapperImage, Divider} from '../components/Sections'
import {Title, H1, H2, H3, Span, Paragraph, Separator} from '../components/Heading'
import {Button, Colors, Check, ArrowRight, RoundImage, StyledBackgroundSection} from '../components/Styling'
import BaseRender from './_baseRender'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {requestSyllabus} from "../actions";

import Modal from '../components/Modal';
import LeadForm from "../components/LeadForm/index.js";

const Location = ({data, pageContext, yml}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return (<>
        <WrapperImage
            paddingBottom="50px"
            github={`/location`}
            imageData={yml.header.image && yml.header.image.childImageSharp.fluid}
            filter="brightness(0.4)"
            className={`img-header`}
            bgSize={`cover`}
            alt={yml.header.alt}
            paddingRight={`0`}

        >
            <Divider height="100px" />
            <H1 type="h1"  fontSize="13px" color={Colors.white} align="center">{yml.seo_title}</H1>
            <Divider height="20px" />
            <Title
                type="h2"
                title={yml.header.tagline}
                paragraph={yml.header.paragraph}
                variant="main"
                color={Colors.white}
                fontSize="46px"
                textAlign="center"
            />
            <Row align="center">
                <Column align="right" size="6" size_sm="12" align="center">
                    <ChooseProgram
                        centered
                        margin="0 0 40px 0"
                        programs={data.allChooseProgramYaml.edges[0].node.programs}
                        openLabel={data.allChooseProgramYaml.edges[0].node.close_button_text}
                        closeLabel={data.allChooseProgramYaml.edges[0].node.open_button_text}
                    />
                </Column>
                <Column align="left" size="6" size_sm="12" align="center">
                    <Button width="200px" onClick={handleOpen} color={Colors.red} margin="0" textColor=" white">{yml.button.syllabus_button_text}</Button>
                </Column>
            </Row>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <LeadForm heading="Request Syllabus" formHandler={requestSyllabus} handleClose={handleClose} />
            </Modal>
        </WrapperImage>
        <Divider height="100px" />

        { yml.breathecode_location_slug !== "online" &&
            <Wrapper >
                <Row>
                    <Column
                        size="12"
                        border="bottom"

                    >
                        <Card shadow borders="1.25rem" height="426px" >
                            <Row
                                height="100%"
                                marginLeft="0"
                                marginRight="0"
                                customRespSize
                            >
                                <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" border="bottom">
                                    <Row align="center" height="100%">
                                        <Column size="10" height="100%">
                                            <Divider height="50px" />
                                            <Row height="5%">
                                                <Column size="12">
                                                    <H3 fs_xs="20px"
                                                        fs_sm="20px"
                                                        fs_md="18px"
                                                        fs_lg="20px"
                                                        fs_xl="24px"
                                                        align="left" >{yml.info_box.heading}</H3>
                                                    <Paragraph primary margin="5px 0" align="left" ></Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="5%" align="around">
                                                <Column size="12" alignSelf="center">
                                                    <Separator  variant="primary" left />
                                                </Column>
                                            </Row>
                                            <Row height="30%">
                                                <Column size="12">
                                                    <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{yml.info_box.address}</Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="5%">
                                                <Column size="12">
                                                    <H3
                                                        fs_xs="20px"
                                                        fs_sm="24px"
                                                        fs_md="18px"
                                                        fs_lg="20px"
                                                        fs_xl="24px"
                                                        align="left" >{yml.info_box.contact_heading}</H3>
                                                    <Paragraph primary margin="5px 0" align="left" ></Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="5%" align="around">
                                                <Column size="12" alignSelf="center">
                                                    <Separator  variant="primary" left />
                                                </Column>
                                            </Row>
                                            <Row height="5%">
                                                <Column size="12">
                                                    <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{yml.info_box.phone}</Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="5%">
                                                <Column size="12">
                                                    <Paragraph color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{yml.info_box.email}</Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="">
                                                <Paragraph color={Colors.gray} fontSize="14px" lineHeight="20px" margin="20px 0 0 0" align="left" ></Paragraph>
                                            </Row>


                                        </Column>
                                    </Row>
                                </Column>
                                <Column
                                    size="6"
                                    customRespSize
                                    respSize="6"
                                    paddingRight={`0`}
                                    border="custom"
                                    customBorderRadius="0 1.25rem 1.25rem 0"
                                >
                                    <StyledBackgroundSection
                                        className={`img-right`}
                                        height={`426px`}
                                        image={yml.info_box.image && yml.info_box.image.childImageSharp.fluid}
                                        bgSize={`cover`}
                                        alt="Cnn Logo"
                                    />
                                </Column>
                            </Row>
                        </Card>
                    </Column>
                </Row>
            </Wrapper>
        }
        <Divider height="100px" />
        <Wrapper >
            <Row>
                <Column
                    size="12"
                    border="bottom"

                >
                    <Card shadow borders="1.25rem" height="426px" >
                        <Row
                            height="100%"
                            marginLeft="0"
                            marginRight="0"
                            customRespSize
                        >
                            <Column size="6" customRespSize respSize="6" paddingLeft="0" alignSelf="center" height="100%" backgroundSize="cover" border="custom" customBorderRadius="1.25rem 0 0 1.25rem" >
                                <Carousel showIndicators={false} showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true}>

                                    {yml.carousel_box.images.map((item, index) => {
                                        return (
                                            <Column
                                                key={index}
                                                size="12"
                                                customRespSize
                                                respSize="12"
                                                paddingLeft={`0`}
                                                border="custom"
                                                customBorderRadius="1.25rem 0 0 1.25rem"
                                            >
                                                <StyledBackgroundSection
                                                    className={`img-left`}
                                                    height={`426px`}
                                                    image={item.path.childImageSharp.fluid}
                                                    bgSize={`cover`}
                                                    alt="Cnn Logo"
                                                />
                                            </Column>
                                        )
                                    })}
                                </Carousel>

                            </Column>
                            <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" border="bottom">
                                <Row align="center" height="100%">
                                    <Column size="10" height="100%">
                                        <Divider height="50px" />
                                        <Row height="15%">
                                            <Column size="12">
                                                <H3 fs_xs="18px"
                                                    fs_sm="20px"
                                                    fs_md="18px"
                                                    fs_lg="20px"
                                                    fs_xl="24px" 
                                                    align="left" 
                                                >{yml.carousel_box.heading}</H3>
                                                <Paragraph primary margin="5px 0" align="left" ></Paragraph>
                                            </Column>
                                        </Row>
                                        <Row height="5%" align="around">
                                            <Column size="12" alignSelf="center">
                                                <Separator  variant="primary" />
                                            </Column>
                                        </Row>
                                        <Row height="30%">
                                            <Column size="12">
                                                <Paragraph
                                                    fs_xs="12px"
                                                    fs_sm="12px"
                                                    fs_md="12px"
                                                    fs_lg="14px"
                                                    fs_xl="14px" color={Colors.gray} margin="20px 0 0 0" align="left" fontSize="14px" lineHeight="20px">{yml.carousel_box.content}</Paragraph>
                                            </Column>
                                        </Row>




                                    </Column>
                                </Row>
                            </Column>

                        </Row>
                    </Card>
                </Column>
            </Row>
        </Wrapper>
        <Divider height="100px" />
    </>
    )
};

export const query = graphql`
  query LocationQuery($file_name: String!, $lang: String!) {
    allLocationYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            seo_title
            breathecode_location_slug
            header{
                tagline
                paragraph
                sub_heading
                image {
                    childImageSharp {
                    fluid(maxWidth: 800){
                        ...GatsbyImageSharpFluid_withWebp
                    }
                    }
                } 
                alt
            }
            button{
                syllabus_button_text
            }
            info_box{
                heading
                address
                phone
                email
                contact_heading
                image {
                    childImageSharp {
                      fluid(maxWidth: 800){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                alt 
            }
            meta_info{
                title
                description
                image
                keywords
            }
            carousel_box{
                heading
                content
                images{
                    path{
                        childImageSharp {
                          fluid(maxWidth: 300){
                            ...GatsbyImageSharpFluid_withWebp
                          }
                        }
                      } 
                    alt
                }
                
            }
            
        }
      }
    }
    allChooseProgramYaml(filter: {lang: {eq: $lang}}) {
        edges {
          node {
            lang
            programs{
                text
                link
                schedule
            }
            open_button_text
            close_button_text
          }
        }
    }
  }
`;

export default BaseRender(Location);
