import React from 'react'
import { compose } from 'redux'
import { withContest } from '../../hoc/ContestListHoc'



const ContestList = (props) => {
    let list =Object.values(props.contest).map(el => <>
        <h2>{el.contestName}</h2>
    </>)
    return <div>
        {list}
    </div>
}

class ContestListContainer extends React.Component {

    render () {
        return <>
            <ContestList contest={this.props.contest} />
        </>
    }
}


export default compose(
    withContest
)(ContestListContainer)