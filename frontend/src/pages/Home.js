import LogIn from "../component/auth/LogIn"
import SignUp from "../component/auth/SignUp"
import { Box,
     Container,
      Text,
      Tab,
      TabList,
      TabPanel,
      TabPanels,
      Tabs
     } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import { useEffect } from "react"

const Home = function() {

  const history = useHistory()

  useEffect(function(){
    const user = JSON.parse(localStorage.getItem("userInfo"))
    if(user){
      history.push("/chat")
    }
  }, [history])
    return(
        <Container maxW="xl" centerContent>
        <Box
            d= "flex"
            justifyContent="center"
            p={3}
            bg={"white"}
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
        >
            <Text textAlign="center" fontSize="4xl" fontFamily="Work sans" color="black">
                TALK-TALK
            </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LogIn />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
        </Box>
        </Container>
    )
}

export default Home 