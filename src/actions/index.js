import alt from '../alt'
import Firebase from 'firebase'
import _ from 'lodash'

class Actions {
  initSession () {
    return (dispatch) => {
      Firebase.auth().onAuthStateChanged(function (result) {
        let profile = null

        if (result) {
          profile = {
            id: result.uid,
            name: result.providerData[0].displayName,
            avatar: result.providerData[0].photoURL
          }
        }

        dispatch(profile)
      })
    }
  }
  login () {
    return (dispatch) => {
      let provider = new Firebase.auth.FacebookAuthProvider()
      provider.addScope('public_profile')
      Firebase.auth().signInWithPopup(provider).then(function (result) {
        let user = result.user

        let profile = {
          id: user.uid,
          name: user.providerData[0].displayName,
          avatar: user.providerData[0].photoURL
        }

        Firebase.database().ref('/users/'+user.uid).set(profile)
        dispatch(profile)

      }).catch(function (error) {
        console.log('Failed!', error)
      })
    }
  }

  logout () {
    return (dispatch) => {
      Firebase.auth().signOut().then(function () {
        // Sign-out successful.
        dispatch(null)
      }, function (error) {
        // An error happened.
        console.log(error)
      })
    }
  }

  getProducts() {
    return(dispatch) => {
      Firebase.database().ref('products').on('value', function(snapshot) {
        let productsValue = snapshot.val();
        let products = _(productsValue).keys().map((productKey) => {
          let item = _.clone(productsValue[productKey])
          item.key = productKey;
          return item;
        })
        .value();
        dispatch(products)
      })
    }
  }

  addProduct(product) {
    return (dispatch) => {
      Firebase.database().ref('products').push(product);
    }
  }

  addVote(productId, userId) {
    return (dispatch) => {
      let voteRef = Firebase.database().ref('votes/'+productId+'/'+userId);
      let upvoteRef = Firebase.database().ref('products/'+productId+'/upvote');
      voteRef.on('value', (snapshot) => {
        if(snapshot.val() == null) {
          voteRef.set(true)

          let vote = 0;
          upvoteRef.on('value', function(snapshot) {
            vote = snapshot.val();
          });
          upvoteRef.set(vote+1);
        }
      })
    }
  }

  addComment(productId, comment) {
    return (dispatch) => {
      Firebase.database().ref('/comments/'+productId).push(comment);
    }
  }

  getComments(productId) {
    return (dispatch) => {
      let commentRef = Firebase.database().ref('comments/'+productId);

      commentRef.on('value', function(snapshot) {
        let commentsValue = snapshot.val();
        let comments = _(commentsValue).keys().map((commentKey) => {
          let item = _.clone(commentsValue[commentKey]);
          item.key = commentKey;
          return item;
        })
        .value();
        dispatch(comments);
      });
    }
  }
}

export default alt.createActions(Actions)
