import { useState } from "react"
import { VStack } from "@chakra-ui/layout"
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react"

const SignUp = function(){
    const [ show, setShow ] = useState(false)
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ password2, setPassword2 ] = useState("")
    const [  picLoading, setPicLoading ] = useState(false)

    const handleClick = function() {
        setShow(!show)
    }
    const postDetails = function(pics) {

    }

    const submitHandler = function() {

    }

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