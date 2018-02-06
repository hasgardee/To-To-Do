import React, { Component } from 'react';
import { Button, ListView, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from '../common';
import { listFetch } from './actions';

class List extends Component {
  
  componentWillMount() {
   this.props.listFetch();
   this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ lists }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
  });

    this.dataSource = ds.cloneWithRows(lists);
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity style={styles.row} onPress={() => this.props.navigation.navigate('Task',{selectedRowId: rowID})} underlayColor='rgba(0,0,0,0)'>
          <Text style={styles.text}>
              {rowData.name}
          </Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ListView 
        contentContainerStyle={styles.list}
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
} 

const mapStateToProps = (state) => {
  const { lists } = state.list;
  
  if (lists) {
    return { lists: lists }
  } 
  return { lists: [] }

};

export default connect(mapStateToProps, { listFetch })(List);

const { width } = Dimensions.get('window')

var styles = {
  list: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 10,
    height: 100,
    width: width/2.4,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
  },
  text: {
    flex: 1,
    fontWeight: 'bold',
  }
}

