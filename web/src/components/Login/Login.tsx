import React from "react";
import styled from "styled-components";
import { Github } from "@styled-icons/fa-brands";

import { Button } from "@blueprintjs/core";
import { config } from "../../config";

const Wrapper = styled.div`
    height: 200px;
    position: relative;
`;

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const Login = () => {
    return (
        <Container className="bp3-card .modifier">
            <a href={`${config.api.url}/auth/github`} className="bp3-button" role="button" tabIndex={0}>
                <Github size={15} />
                <span className="bp3-button-text">Sign in with Github</span>
            </a>
        </Container>
    );
};
