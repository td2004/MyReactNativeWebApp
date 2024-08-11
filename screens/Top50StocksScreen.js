import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const stocks = [
    { symbol: 'CBA', name: 'Commonwealth Bank of Australia', price: 124.89, marketCap: 209.01, sector: 'Financials' },
    { symbol: 'BHP', name: 'BHP Group Ltd', price: 41.11, marketCap: 208.49, sector: 'Materials' },
    { symbol: 'CSL', name: 'CSL Ltd', price: 301.10, marketCap: 145.51, sector: 'Health Care' },
    { symbol: 'NAB', name: 'National Australia Bank Ltd', price: 34.81, marketCap: 107.56, sector: 'Financials' },
    { symbol: 'WBC', name: 'Westpac Banking Corporation', price: 27.68, marketCap: 95.75, sector: 'Financials' },
    { symbol: 'ANZ', name: 'ANZ Group Holdings Ltd', price: 27.43, marketCap: 82.31, sector: 'Financials' },
    { symbol: 'WES', name: 'Wesfarmers Ltd', price: 69.16, marketCap: 78.44, sector: 'Consumer Discretionary' },
    { symbol: 'MQG', name: 'Macquarie Group Ltd', price: 195.76, marketCap: 74.71, sector: 'Financials' },
    { symbol: 'GMG', name: 'Goodman Group', price: 32.12, marketCap: 61.00, sector: 'Real Estate' },
    { symbol: 'FMG', name: 'Fortescue Ltd', price: 18.40, marketCap: 56.65, sector: 'Materials' },
    { symbol: 'WDS', name: 'Woodside Energy Group Ltd', price: 26.48, marketCap: 50.28, sector: 'Energy' },
    { symbol: 'RIO', name: 'RIO Tinto Ltd', price: 118.68, marketCap: 44.06, sector: 'Materials' },
    { symbol: 'TLS', name: 'Telstra Group Ltd', price: 3.81, marketCap: 44.02, sector: 'Communication Services' },
    { symbol: 'WOW', name: 'Woolworths Group Ltd', price: 33.31, marketCap: 40.69, sector: 'Consumer Staples' },
    { symbol: 'TCL', name: 'Transurban Group', price: 12.81, marketCap: 39.61, sector: 'Industrials' },
    { symbol: 'ALL', name: 'Aristocrat Leisure Ltd', price: 49.75, marketCap: 31.4, sector: 'Consumer Discretionary' },
    { symbol: 'WTC', name: 'Wisetech Global Ltd', price: 84.26, marketCap: 28.18, sector: 'Information Technology' },
    { symbol: 'REA', name: 'REA Group Ltd', price: 190.69, marketCap: 25.19, sector: 'Communication Services' },
    { symbol: 'QBE', name: 'QBE Insurance Group Ltd', price: 16.49, marketCap: 24.77, sector: 'Financials' },
    { symbol: 'STO', name: 'Santos Ltd', price: 7.47, marketCap: 24.26, sector: 'Energy' },
    { symbol: 'COL', name: 'Coles Group Ltd', price: 17.94, marketCap: 24.03, sector: 'Consumer Staples' },
    { symbol: 'JHX', name: 'James Hardie Industries Plc', price: 50.93, marketCap: 21.97, sector: 'Materials' },
    { symbol: 'COH', name: 'Cochlear Ltd', price: 327.83, marketCap: 21.47, sector: 'Health Care' },
    { symbol: 'RMD', name: 'Resmed Inc', price: 32.73, marketCap: 20.74, sector: 'Health Care' },
    { symbol: 'SUN', name: 'Suncorp Group Ltd', price: 16.20, marketCap: 20.61, sector: 'Financials' },
    { symbol: 'BXB', name: 'Brambles Ltd', price: 14.54, marketCap: 20.25, sector: 'Industrials' },
    { symbol: 'XRO', name: 'Xero Ltd', price: 128.09, marketCap: 19.55, sector: 'Information Technology' },
    { symbol: 'ORG', name: 'Origin Energy Ltd', price: 10.22, marketCap: 17.61, sector: 'Utilities' },
    { symbol: 'SCG', name: 'Scentre Group', price: 3.32, marketCap: 17.25, sector: 'Real Estate' },
    { symbol: 'FPH', name: 'Fisher & Paykel Healthcare Corporation Ltd', price: 28.95, marketCap: 16.96, sector: 'Health Care' },
    { symbol: 'REH', name: 'Reece Ltd', price: 26.13, marketCap: 16.88, sector: 'Industrials' },
    { symbol: 'IAG', name: 'Insurance Australia Group Ltd', price: 6.95, marketCap: 16.47, sector: 'Financials' },
    { symbol: 'NST', name: 'Northern Star Resources Ltd', price: 14.18, marketCap: 16.3, sector: 'Materials' },
    { symbol: 'VAS', name: 'Vanguard Australian Shares INDEX ETF', price: 94.58, marketCap: 14.97, sector: 'Financials' },
    { symbol: 'CPU', name: 'Computershare Ltd', price: 25.29, marketCap: 14.95, sector: 'Industrials' },
    { symbol: 'SVW', name: 'Seven Group Holdings Ltd', price: 36.70, marketCap: 14.94, sector: 'Industrials' },
    { symbol: 'PME', name: 'Pro Medicus Ltd', price: 130.85, marketCap: 13.66, sector: 'Health Care' },
    { symbol: 'SHL', name: 'Sonic Healthcare Ltd', price: 27.24, marketCap: 13.09, sector: 'Health Care' },
    { symbol: 'S32', name: 'SOUTH32 Ltd', price: 2.84, marketCap: 12.86, sector: 'Materials' },
    { symbol: 'SOL', name: 'Washington H Soul Pattinson & Company Ltd', price: 34.53, marketCap: 12.46, sector: 'Financials' },
    { symbol: 'CAR', name: 'CAR Group Ltd', price: 32.45, marketCap: 12.24, sector: 'Communication Services' },
    { symbol: 'PMGOLD', name: 'Gold Corporation', price: 37.88, marketCap: 12.18, sector: 'Materials' },
    { symbol: 'ASX', name: 'ASX Ltd', price: 61.64, marketCap: 11.95, sector: 'Financials' },
    { symbol: 'TLC', name: 'The Lottery Corporation Ltd', price: 4.84, marketCap: 10.77, sector: 'Consumer Discretionary' },
    { symbol: 'MPL', name: 'Medibank Private Ltd', price: 3.83, marketCap: 10.55, sector: 'Financials' },
    { symbol: 'SGP', name: 'Stockland', price: 4.39, marketCap: 10.48, sector: 'Real Estate' },
    { symbol: 'NEM', name: 'Newmont Corporation', price: 74.69, marketCap: 10.4, sector: 'Materials' },
    { symbol: 'RHC', name: 'Ramsay Health Care Ltd', price: 45.20, marketCap: 10.38, sector: 'Health Care' },
    { symbol: 'MIN', name: 'Mineral Resources Ltd', price: 51.99, marketCap: 10.22, sector: 'Materials' },
    { symbol: 'APA', name: 'APA Group', price: 7.89, marketCap: 10.13, sector: 'Utilities' }
  ];
  


stocks.sort((a, b) => a.marketCap - b.marketCap);

const StockList = () => {
    const topFive = stocks.slice(0, 5);
    const bottomFive = stocks.slice(-5);
  
    const renderItem = ({ item }) => (
        <View style={styles.item}>
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>Price: ${item.price}</Text>
          <Text style={styles.details}>Market Cap: ${item.marketCap}B</Text>
          <Text style={styles.details}>Sector: {item.sector}</Text>
        </View>
      );
    
      return (
        <View style={styles.container}>
          <View style={styles.column}>
            <Text style={styles.header}>Top 5 Stocks</Text>
            <FlatList
              data={topFive}
              renderItem={renderItem}
              keyExtractor={(item) => item.symbol}
              contentContainerStyle={styles.flatList}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.header}>Bottom 5 Stocks</Text>
            <FlatList
              data={bottomFive}
              renderItem={renderItem}
              keyExtractor={(item) => item.symbol}
              contentContainerStyle={styles.flatList}
            />
          </View>
          <View style={styles.fullListContainer}>
            <Text style={styles.header}>All 50 Stocks</Text>
            <FlatList
              data={stocks}
              renderItem={renderItem}
              keyExtractor={(item) => item.symbol}
              contentContainerStyle={styles.flatList}
            />
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
      },
      column: {
        flex: 1,
        marginHorizontal: 5,
        maxHeight: '45%', 
      },
      fullListContainer: {
        flex: 1,
        marginTop: 10,
      },
      item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      symbol: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      name: {
        fontSize: 16,
      },
      details: {
        fontSize: 14,
        color: 'grey',
      },
      header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      flatList: {
        flexGrow: 1, 
      },
    });
export default StockList;
