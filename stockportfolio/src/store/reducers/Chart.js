

const initialState = {
    title: {
      text: 'My stock chart'
    },
    series: [{
        data:[
            [1,2],[1,3],[2,3],[3,4],[5,6],[5,7],[6,9],[6,2],[7,1]
        ]
    }]
  }


 const chartReducer = (state = initialState, actions)=>{
            switch(actions.type){
                case 'UPDATE':
                    return {
                        // ...state,
                        title: {
                            text: actions.payload.data[0]
                          },
                          series: [{
                              data:actions.payload.data[1],
                          }]
                    }
                default: return{
                    ...state
                }    
            }
 } 

 export default chartReducer;