import { useState } from "react"
import { VStack } from "@chakra-ui/layout"
import { useToast } from "@chakra-ui/react";
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement} from "@chakra-ui/react"
import axios from "axios";
import { useHistory } from "react-router-dom";




const LogIn = function(){
    const [ show, setShow ] = useState(false)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const toast = useToast() 
    const history = useHistory();

    const handleClick = function() {
        setShow(!show)
    }

    const submitHandler = async function() {
        setLoading(true)
        if(!email || !password){
            toast({
                title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        });
        setLoading(false)
        return;
    }
        try{
            const config = {
                headers: {
                  "Content-type": "application/json",
                },
              }; 
            const {data} = await axios.post("/api/user/login", {email, password}, config)
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom", 
            });
            localStorage.setItem("userInfo", JSON.stringify(data))
            setLoading(false);
            history.push("/chat");
        }catch(error){
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              setLoading(false);
        }

       
    };
    return(
        <VStack spacing="5px" color="black">
            <FormControl id="email" isRequired>
                 <FormLabel>Email</FormLabel>
                <Input type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    value={email}
                 />
            </FormControl>

            <FormControl id="password" isRequired>
                 <FormLabel>Password</FormLabel>
                 <InputGroup>
                 <Input type={ show ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    value={password}
                 />
                 <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
                 </InputGroup>
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                setLoading={loading}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                setEmail("guest@example.com");
                setPassword("123456");
                }}
            >Get Gest User Credentials</Button>
        </VStack>
    )
}

export default LogIn