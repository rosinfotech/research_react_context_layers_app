import { ContextAPIProvider } from "@contexts/ContextAPI";
import { ContextEnvironmentProvider } from "@contexts/ContextEnvironment";
import { ContextFormsProvider } from "@contexts/ContextForms";
import { ContextRepositoriesProvider } from "@contexts/ContextRepositories";
import { ContextServicesProvider } from "@contexts/ContextServices";
import { ContextStateProvider } from "@contexts/ContextState";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { PageIndex } from "@pages/PageIndex";
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
                            <ContextFormsProvider>
                                <ThemeProvider theme={ theme }>
                                    <CssBaseline />
                                    <PageIndex />
                                </ThemeProvider>
                            </ContextFormsProvider>
                        </ContextRepositoriesProvider>
                    </ContextServicesProvider>
                </ContextAPIProvider>
            </ContextStateProvider>
        </ContextEnvironmentProvider>
    </ErrorBoundary>
);
