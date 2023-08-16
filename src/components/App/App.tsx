import { Page } from "@components/Page";
import { ContextAPIProvider } from "@contexts/ContextAPI";
import { ContextEnvironmentProvider } from "@contexts/ContextEnvironment";
import { ContextRepositoriesProvider } from "@contexts/ContextRepositories";
import { ContextServicesProvider } from "@contexts/ContextServices";
import { ContextStateProvider } from "@contexts/ContextState";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ErrorBoundary } from "../ErrorBoundary";
import type { FC } from "react";

const theme = createTheme();

export const App: FC = () => (
    <ErrorBoundary>
        <ContextEnvironmentProvider>
            <ContextStateProvider>
                <ContextAPIProvider>
                    <ContextServicesProvider>
                        <ContextRepositoriesProvider>
                            <ThemeProvider theme={ theme }>
                                <CssBaseline />
                                <Page />
                            </ThemeProvider>
                        </ContextRepositoriesProvider>
                    </ContextServicesProvider>
                </ContextAPIProvider>
            </ContextStateProvider>
        </ContextEnvironmentProvider>
    </ErrorBoundary>
);
