import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Modalview from '../modal/ModalView';

//Uncomment below and add your personal token to test the app.
//let token = 'Basic XXXXXXXXXXXXXX' 
//let token = process.env.FSTOKEN

const Home = () => {
    const [state, setState] = useState({
        data: [],
        fsData: [],
        isLoading: true,
        modalIsOpen: false,
        rowinfo: [],
        error: false,
        search: ''
    })

    useEffect(() => {
        gitHubIssues()
    }, [])

    const gitHubIssues = async () => {
        await axios.get('http://api.github.com/repos/gaforester/fullstory-example-app-nodejs/issues',{
            params: {
              state: "all"
            }
        })
        .then((response) => {            
            setState({...state, data: response.data, isLoading: false})
        })
        .catch((err) => {
            console.log(err);
            setState({...state, error: true})
        });
    }

    let repo = []
    async function gitHubRepoInfo() {
        try{
            repo[0] = await axios.get('https://api.github.com/repos/gaforester/fullstory-example-app-nodejs')
            console.log(repo[0].data)
            return repo[0].data
        } catch (err) {
            console.log(err);
        }
    }

    let response = []
    async function getFullStoryData(user) {
        try {
            response[0] = await axios.get('https://cors-anywhere.herokuapp.com/https://www.fullstory.com/api/v1/sessions',{
                params: {
                    'email': user
                },
                headers: {
                    'Authorization': token,
                    'Access-Control-Allow-Origin': '*'
                }   
            }) 
            console.log(response[0].data)
            return response[0].data        
        } catch (err) {
            console.log(err);
        }
    }

    const closeModal = e => {
        setState({...state, modalIsOpen: false});
    }

    const ErrorBanner = props => {
        if (!props.error) {
            return null;
        }

        return (
            <div className="alert alert-warning" role="alert" style={{marginTop: "100px"}}>
                Oops.... Something went wrong getting your data please try refreshing the page.
            </div>
        );
    }

    let dataCube = state.data
    console.log(dataCube)
    for (const d of dataCube) {
        if(d.assignee == null){
            d.assignee = []
            d.assignee.login = "Unassigned"
        }
        d.repo_name = "fullstory-example-app-nodejs"
    }

    async function setCustomData(data) {
        for (const d of data) {
            d.email = d.user.login === 'gaforester' ? 'roger@forestgeek.com' : 'Unknown'
            const fsUser = getFullStoryData(d.email);
            var results = await Promise.all([fsUser]);
            d.fsSessionUrl = await results[0][0].FsUrl
            const ghData = gitHubRepoInfo();
            var gh = await Promise.all([ghData]);
            console.log(gh[0].html_url) 
            d.repository_url = await gh[0].html_url
        }
    }

    if (state.search) {
        console.log(state.search)
        console.log(dataCube)
        dataCube = dataCube.filter(row => {
            return row.title.includes(state.search) || row.user.login.includes(state.search) 
                || row.state.includes(state.search) || row.assignee.login.includes(state.search) 
        })
    }

    setCustomData(dataCube)

    const columns = [{
        id: 'number',
        Header: 'Issue #',
        accessor: 'number',
        width: 75
    }, {
        Header: props => <span>Title</span>, // Custom header components!
        accessor: 'title',
        width: 200
    }, {
        Header: 'Created',
        accessor: 'created_at', 
    }, {
        Header: 'Updated',
        accessor: 'updated_at',
    }, {
        Header: props => <span>Reporter</span>, // Custom header components!
        accessor: 'user.login',
        width: 100
    }, {
        Header: props => <span>Repo</span>, // Custom header components!
        accessor: 'repo_name',
        width: 240
    }, {
        Header: props => <span>Assignee</span>, // Custom header components!
        accessor: 'assignee.login'
    }, {
        Header: props => <span>Status</span>, // Custom header components!
        accessor: 'state'
    }]

    return (
        <div>
            {state.modalIsOpen ? (<Modalview
                rowinfo={state.rowInfo}
                modalIsOpen={true}
                closeModal={closeModal}
            />) : ""}
            <ErrorBanner error={state.error}/>
            <br/>
            Search: <input
                        value={state.search}
                        onChange={e => setState({...state, search: e.target.value})}
                    />
            <ReactTable
                className={"-striped -highlight"}
                data={dataCube}
                sorted={[{id: 'number',desc: false}]}
                columns={columns}
                pageSize={10}
                style={{marginTop: "20px"}}
                loading={state.isLoading ? true : false}
                getTdProps={(state, rowInfo) => {
                    return {
                        onClick: (e) => {
                            setState({...state, rowInfo: rowInfo.original, modalIsOpen: true})

                        }
                    };
                }}
            />
        </div>
    )
}

export default Home;
