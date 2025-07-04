// import { TrumpLitigationDataGrid } from "./DataGrid";
import { DemoDataGrid } from "./DemoDataGrid";
import { ExternalLink } from "./ExternalLink";

function App() {
    return (
        <>
            <h1>Trump Litigation Tracker</h1>
            <p>
                Building on the efforts of{" "}
                <ExternalLink href="https://www.courtwatch.news/p/lawsuits-related-to-trump-admin-executive-orders">
                    courtwatch.news
                </ExternalLink>{" "}
                and{" "}
                <ExternalLink href="https://www.justsecurity.org/107087/tracker-litigation-legal-challenges-trump-administration">
                    Just Security
                </ExternalLink>
                , this page tracks litigation against the Trump administration.
            </p>
            <DemoDataGrid />
        </>
    );
}

export default App;
