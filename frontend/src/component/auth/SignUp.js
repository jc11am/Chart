import { useState } from "react"
import { VStack } from "@chakra-ui/layout"
import { useToast } from "@chakra-ui/react"
import axios from "axios";
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useHistory } from "react-router-dom";

const SignUp = function(){
    const [ show, setShow ] = useState(false)
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ password2, setPassword2 ] = useState("")
    const [ pic, setPic ] = useState()
    const [  picLoading, setPicLoading ] = useState(false)
    const toast = useToast()
    const history = useHistory();

    const handleClick = function() {
        setShow(!show)
    }

    const postDetails = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
          toast({
            title: "Please Select an Image!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "chat-app");
          data.append("cloud_name", "dmwnslkwl");
          fetch("https://api.cloudinary.com/v1_1/dmwnslkwl/image/upload", {
            method: "post",
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {
              setPic(data.url.toString());
              console.log(data.url.toString());
              setPicLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setPicLoading(false);
            });
        } else {
          toast({
            title: "Please Select an Image!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
          return;
        }
      };

      const submitHandler = async () => {
        setPicLoading(true);
        if (!name || !email || !password || !password2) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
          return;
        }
        if (password !== password2) {
          toast({
            title: "Passwords Do Not Match",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
        console.log(name, email, password, pic);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = await axios.post(
            "/api/user/signup",
            {
              name,
              email,
              password,
              pic,
            },
            config
          );
          console.log(data);
          toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          setPicLoading(false);
          history.push("/chat");
          
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
        }
      };

    return(
        <VStack spacing="5px" color="black">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}
                    value={name}
                 />
            </FormControl>
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

            <FormControl id="password" isRequired>
                 <FormLabel>Confirm Password</FormLabel>
                 <InputGroup>
                 <Input type={ show ? "text" : "password"}
                    name="password"
                    placeholder="Confirm Password"
                    onChange={(e)=>{
                        setPassword2(e.target.value)
                    }}
                    value={password2}
                 />
                 <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
                 </InputGroup>
            </FormControl>

            <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={picLoading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default SignUp