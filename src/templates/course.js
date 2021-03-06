import React, {useState, useEffect, useContext, useRef} from 'react';
import {navigate} from '@reach/router';
import {useInView} from "react-intersection-observer";
import Layout from '../global/Layout';
import styled from 'styled-components';
import {Card} from '../components/Card'
import {Container, Row, Column, Wrapper, WrapperImage, Divider, Sidebar, Div} from '../components/Sections'
import {Title, H2, H3, H4, Span, Paragraph} from '../components/Heading'
import {Button, Colors, Check, ArrowRight, Circle, RoundImage, Utensils, Coffee, Dumbbell, LaptopCode, FileCode} from '../components/Styling'
import GeeksVsOthers from '../components/GeeksVsOthers'
import PricesAndPayment from '../components/PricesAndPayment'
import AlumniProjects from '../components/AlumniProjects'
import BaseRender from './_baseRender'
import ProgramSelector from '../components/ProgramSelector'
import {requestSyllabus} from "../actions";
import Credentials from '../components/Credentials'
import Scrollspy from 'react-scrollspy'
// import {makeStyles} from '@material-ui/core/styles';
import {Device, Break} from '../components/Responsive'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import LeadForm from "../components/LeadForm/index.js";
import ProgramDetails from '../components/ProgramDetails';
import ProgramDetailsMobile from '../components/ProgramDetailsMobile';
import SyllabusSVG from "../assets/images/syllabus.inline.svg";
import TypicalDay from "../components/TypicalDay"
import Modal from '../components/Modal';
// import SimpleModal from '../components/SimpleModal';

function rand () {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '1.25rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const Program = ({data, pageContext, yml}) => {
  const [ref, inView] = useInView({
    threshold: 0
  });
  const scrollRef = useRef();
  const geek = data.allCourseYaml.edges[0].node;
  const [open, setOpen] = React.useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps(yml);
  const program_type = yml.meta_info.slug.includes("full-time") ? "full_time" : "part_time"

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  let week = "";
  {
    pageContext.slug === "full-stack-web-development-bootcamp-full-time" || pageContext.slug === "desarrollo-web-full-stack-bootcamp-full-time"
      ? week = 9
      : pageContext.slug === "full-stack-web-development-bootcamp-part-time" || pageContext.slug === "desarrollo-web-full-stack-bootcamp-part-time"
        ? week = 16
        : pageContext.slug === "coding-introduction" || pageContext.slug === "introduccion-programacion"
        && null
  }

  return (<>
    <WrapperImage
      github="/course"
      filter="brightness(0.4)"
      imageData={yml.header.image && yml.header.image.childImageSharp.fluid}
      className={`img-header`}
      bgSize={`cover`}
      alt={yml.header.alt}
      paddingRight={`0`}
      customBorderRadius="0 0 0 1.25rem"
    >
      <ProgramSelector week={week} context={pageContext} marginTop="70px" />
      <Title
        size="5"
        marginTop="20px"
        title={yml.header.tagline}
        variant="main"
        color={Colors.white}
        paragraph={yml.header.paragraph}
        fontSize="46px"
        fs_xs="40px"
        textAlign="center"
      />
      <Row align="center" marginBottom="50px">
        <Column align="right" size="6" align_sm="center" m_sm="0px 0px 15px 0px" size_sm="12" align="right">
          <Button width="200px" onClick={() => navigate(yml.button.apply_button_link)} color="red" margin="0" textColor=" white">{yml.button.apply_button_text}</Button>
        </Column>
        <Column align="left" size="6" align_sm="center" size_sm="12" align="left">
          <Button width="200px" onClick={handleOpen} color={Colors.blue} margin="0" textColor=" white">{yml.button.syllabus_button_text}</Button>
        </Column>
      </Row>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <LeadForm heading="Request Syllabus" formHandler={requestSyllabus} handleClose={handleClose} 
          data={{ 
            course: { value: yml.meta_info.bc_slug, valid: true }
          }}
        />
      </Modal>
    </WrapperImage>

    <Wrapper margin="80px 0 0 0" m_sm="0">
      <Title
        size="10"
        title={"This Program By The Numbers"}
        paragraph={"Our results speak for themselves"}
      />
      <Credentials lang={data.allCredentialsYaml.edges} />
    </Wrapper>

    {/* PROGRAM DETAILS */}
    <Wrapper >
      <Title
        size="10"
        marginTop="40px"
        title={yml.details.heading}
        paragraph={yml.details.sub_heading}
        variant="primary"
      />
      <ProgramDetails details={yml.details} />
      <ProgramDetailsMobile details={yml.details} />
    </Wrapper>

    <Sidebar
      shadow
      borders="1.25rem"
      display_xs="none"
      display_sm="none"
      display_md="none"
    >
      <Scrollspy style={{fontSize: "12px", position: "-webkit-sticky", position: "sticky", top: "10%", fontFamily: "Lato-Bold, sans-serif", color: Colors.blue}} items={['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6',]} currentClassName="nav__item--active ">
        <li className="scroll_li"><a className="nav-item nav-link side" href="#section-1" >{yml.sidebar.membership}</a></li>
        <li className="scroll_li"><a className="nav-item nav-link side" href="#section-2">{yml.sidebar.program}</a></li>
        <li className="scroll_li"><a className="nav-item nav-link side" href="#section-3">{yml.sidebar.geeks_vs_other}</a></li>
        <li className="scroll_li"><a className="nav-item nav-link side" href="#section-4">{yml.sidebar.pricing}</a></li>
        <li className="scroll_li"><a className="nav-item nav-link side" href="#section-5">{yml.sidebar.alumni}</a></li>
      </Scrollspy>
    </Sidebar>

    <Wrapper

      margin="50px"
    >
      <Title
        size="10"
        title={yml.geeks_vs_others.heading}
        paragraph={yml.geeks_vs_others.sub_heading}
        variant="primary"
      />
      <Divider height="50px" />
      <GeeksVsOthers lang={pageContext.lang} limit={5} />
    </Wrapper>

    <Row height="100%">
      <Column size="12">
        <SyllabusSVG />
      </Column>
    </Row>

    {/* GEEKPAL && GEEKFORCE SECTION */}
    {/* ---------------------------- */}
    <Container fluid>
      <Row>
        <Column size="2" disp_md="none" />
        <Column size="8" size_md="10" m_md="auto">
          <Row >
            <Column size="6" size_sm="12" paddingLeft={`0`}>
              <Card
                cursor="pointer"
                onClick={() => navigate(`/${pageContext.lang}/geekpal`)}
                h_xs="400px"
                h_sm="370px"
                h_md="470px"
                h_lg="470px"
                h_xl="470px"
                padding="20px"
                shadow height="400px"
                width="100%"
                margin="10px 0px"
              >
                <Row height="100%">
                  <Column size="10" customRespSize respSize="10" display={`flex`} flexDirection={`column`} justifyContent={`space-between`}>
                    <Div flexDirection={`column`} height={`20%`} justifyContent={`space-between`}>
                      <Row marginLeft="0px" height={`70%`} >
                        <RoundImage url="/images/geekpal.png" bsize="contain" height="100%" position="left" />
                      </Row>
                      <Row height={`20%`}>
                        <Column size="12">
                          <Paragraph
                            fs_xs="10px"
                            fs_sm="10px"
                            fs_md="11px"
                            fs_lg="12px"
                            fs_xl="16px"
                            color={Colors.black}
                            align_xs="left">
                            {geek.geek_data.geek_pal_heading}
                          </Paragraph>
                        </Column>
                      </Row>
                    </Div>
                    <Div flexDirection={`column`} height={`80%`} justifyContent={`space-between`}>
                      <Row marginTop="15px" height={`100%`}>
                        <Column size="12" display={`flex`} flexDirection={`column`} justifyContent={`space-evenly`}>
                          {geek.geek_data.geek_pal.map((pal, index) => {
                            return (
                              <Row key={index} marginBottom="4px">
                                <Column size="1" customRespSize respSize="1" alignSelf="center">
                                  <Check width="12px" color={Colors.yellow} fill={Colors.yellow} />
                                </Column>
                                <Column size="8" customRespSize respSize="8" test paddingRight="0px" paddingLeft="5px" alignSelf="center">
                                  <Paragraph
                                    fs_xs="10px"
                                    fs_sm="10px"
                                    fs_md="12px"
                                    fs_lg="12px"
                                    fs_xl="14px"
                                    color={Colors.gray}>{pal}</Paragraph>
                                </Column>
                              </Row>
                            )
                          })}
                        </Column>
                      </Row>
                    </Div>
                  </Column>
                  <Column size="2" customRespSize respSize="2" alignSelf="flex-end">
                    <ArrowRight width="24px" color={Colors.yellow} fill={Colors.yellow} />
                  </Column>
                </Row>
              </Card>
            </Column>
            <Column size="6" size_sm="12" paddingRight={`0`}>
              <Card
                cursor="pointer"
                onClick={() => navigate(`/${pageContext.lang}/geekforce`)}
                h_xs="400px"
                h_sm="400px"
                h_md="470px"
                h_lg="470px"
                h_xl="470px"
                padding="20px"
                shadow
                height="400px"
                width="100%"
                margin="10px 0px"
              >
                <Row height="100%">
                  <Column size="10" customRespSize respSize="10" display={`flex`} flexDirection={`column`} justifyContent={`space-between`}>
                    <Div flexDirection={`column`} height={`20%`}>
                      <Row marginLeft="0px" height={`70%`}>
                        <RoundImage url="/images/geekforce.png" bsize="contain" height="100%" position="left" />
                      </Row>
                      <Row height={`20%`}>
                        <Column size="12">
                          <Paragraph fontSize="16px" color={Colors.black} customTextAlignSmall
                            align_xs="left">
                            {geek.geek_data.geek_force_heading}
                          </Paragraph>
                        </Column>
                      </Row>
                    </Div>
                    <Div flexDirection={`column`} height={`80%`} justifyContent={`space-between`}>
                      <Row marginTop="15px" height={`100%`}>
                        <Column size="12" display={`flex`} flexDirection={`column`} justifyContent={`space-evenly`}>
                          {geek.geek_data.geek_force.map((pal, index) => {
                            return (
                              <Row key={index} marginBottom="2px" >
                                <Column size="1" customRespSize respSize="1" alignSelf="center">
                                  <Check width="12px" color={Colors.yellow} fill={Colors.yellow} />
                                </Column>
                                <Column size="8" customRespSize respSize="8" paddingRight="0px" paddingLeft="5px" alignSelf="center">
                                  <Paragraph fs_xs="10px"
                                    fs_sm="10px"
                                    fs_md="11px"
                                    fs_lg="12px"
                                    fs_xl="14px" color={Colors.gray}>{pal}</Paragraph>
                                </Column>
                              </Row>
                            )
                          })}
                        </Column>
                      </Row>
                    </Div>
                  </Column>
                  <Column size="2" customRespSize respSize="2" alignSelf="flex-end">
                    <ArrowRight width="24px" color={Colors.yellow} fill={Colors.yellow} />
                  </Column>
                </Row>
              </Card>
            </Column>
          </Row>
        </Column>
      </Row>
    </Container>
    {/* </Wrapper> */}

    <Wrapper

      margin="50px 0"
      github="/course"
    >
      <Title
        size="10"
        title={yml.prices.heading}
        paragraph={yml.prices.sub_heading}
        variant="primary"
      />
      <PricesAndPayment
        type={pageContext.slug}
        locations={data.allLocationYaml.edges}
        course={program_type}
      />
    </Wrapper>

    {program_type === "full_time" && <TypicalDay data={yml.typical} />}

    <Wrapper
      margin="50px 0"
    >
      <Title
        size="10"
        title={yml.alumni.heading}
        paragraph={yml.alumni.sub_heading}
        maxWidth="66%"
        variant="primary"
      />
      <AlumniProjects hasTitle lang={data.allAlumniProjectsYaml.edges} limit={2} />
    </Wrapper>
    {/* </div> */}
  </>
  )
};

export const query = graphql`
  query CourseQuery($file_name: String!, $lang: String!) {
    allCourseYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            header{
              tagline
              paragraph
              image {
                childImageSharp {
                  fluid(maxWidth: 1200){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            alt
            }
            button{
              syllabus_button_text
              syllabus_submit_text
              apply_button_text
              apply_button_link
            }
            meta_info{
                title
                description
                image
                keywords
                slug
            }
            geek_data {
              geek_force
              geek_pal
              geek_pal_heading
              geek_force_heading
            }
            details {
              heading
              sub_heading
              left_labels{
                description
                projects
                duration
                skills
              }
              details_modules {
                title
                projects
                slug
                module_name
                duration
                description
                step
              }
            }
            geeks_vs_others{
              heading
              sub_heading
              sub_heading_link
          }
            prices{
              heading
              sub_heading
            }
            typical{
              heading
              sub_heading
              schedule{
                title
                time
                icon
                content
                step
              }
            }
            alumni{
              heading
              sub_heading
            }
            sidebar{
              membership
              program
              geeks_vs_other
              pricing
              alumni
            }
        }
      }
    }
    allAlumniProjectsYaml(filter: { fields: { lang: { eq: $lang }}}){
      edges {
        node {
          header{
            tagline
            sub_heading
            button_text
          }
          projects {
              project_name
              slug
              project_image{
                  image {
                      childImageSharp {
                        fluid(maxWidth: 800){
                          ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    } 
                  image_alt
              }
              project_content
              project_video
              live_link
              github_repo
              alumni {
                first_name
                last_name
                job_title
                github
                linkedin
                twitter
              }
            }
          button_section{
            button_text
            button_link
          }
        }
      }
    }
    allCredentialsYaml(filter: { fields: { lang: { eq: $lang }}}) {
      edges {
        node {
          credentials {
            title
            slug
            value
            symbol
            symbol_position
          }
        }
      }
    }
    allLocationYaml(filter: {fields: { lang: {eq: $lang}}, meta_info: { unlisted: {ne: true }}}){
      edges {
        node {
          id
          city
          hasFinancialsOption
          financials_max_months
          fields{
            lang
          }
          meta_info {
            slug
            description
            image
            position
            unlisted
            keywords
            redirects
          }
          header{
            sub_heading
            tagline
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 800){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            } 
          }
          
          prices {
            full_time {
              center_section {
                button {
                  button_text
                }
                header {
                  sub_heading
                  heading_one
                  heading_two
                }
                plans {
                  months
                  payment
                  paymentInfo
                  provider
                  logo
                  message
                }
              }
              left_section {
                button {
                  button_text
                }
                content {
                  price
                  price_info
                }
                header {
                  heading_one
                  heading_two
                  sub_heading
                }
              }
              right_section {
                button {
                  button_text
                }
                content {
                  price
                  price_info
                }
                header {
                  sub_heading
                  heading_one
                  heading_two
                }
              }
            }
            part_time {
              center_section {
                button {
                  button_text
                }
                header {
                  heading_two
                  sub_heading
                  heading_one
                }
                plans {
                  months
                  payment
                  paymentInfo
                  provider
                  logo
                  message
                }
              }
              left_section {
                button {
                  button_text
                }
                content {
                  price
                  price_info
                }
                header {
                  heading_one
                  sub_heading
                  heading_two
                }
              }
              right_section {
                button {
                  button_text
                }
                content {
                  price
                  price_info
                }
                header {
                  heading_one
                  sub_heading
                  heading_two
                }
              }
            }
          }
          
        }
      }
    }
  }
`;



const Header = styled.div`
    background: black;
    border-radius: 1.25rem 1.25rem 0 0;
    height: ${props => props.height};
    color: white;
    font-family: 'lato', sans-serif;
    font-size: 14px;
    font-weight: 800;
    align-items: center;
`;
const Body = styled.div`
    background: white;
    height: ${props => props.height};
    border-radius: 0 0 1.25rem 1.25rem;`

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 5,
    left: 'calc(-50% + 5px)',
    right: 'calc(50% + 5px)',
    color: 'black'
  },
  active: {
    '& $line': {
      borderColor: Colors.white,
    },
  },
  completed: {
    '& $line': {
      borderColor: Colors.yellow,
    },
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: Colors.blue,
  },
  line: {
    borderColor: 'white',
    borderTopWidth: 1,
    borderRadius: 1,
  },
})(StepConnector);
const useQontoStepIconStyles = makeStyles({
  root: {
    color: 'black',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: Colors.blue,
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});
function QontoStepIcon (props) {
  const classes = useQontoStepIconStyles();
  const {active, completed} = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: Colors.yellow,
    width: 12,
    height: 12,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: Colors.yellow
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon (props) {
  const classes = useColorlibStepIconStyles();
  const {active, completed} = props;

  const icons = {
    1: <Circle width="32" color={Colors.yellow} fill={Colors.yellow} />,
    2: <Circle width="32" color={Colors.yellow} fill={Colors.yellow} />,
    3: <Circle width="32" color={Colors.yellow} fill={Colors.yellow} />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function getSteps (day) {
  return [
    {icon: <Circle width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[0].time},
    {icon: <Coffee width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[1].time},
    {icon: <FileCode width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[2].time},
    {icon: <LaptopCode width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[3].time},
    {icon: <Utensils width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[4].time},
    {icon: <Dumbbell width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[5].time},
  ];
}
export default BaseRender(Program);