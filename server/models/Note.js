module.exports = (sequelize, DataTypes)=>{
    
    const Note = sequelize.define('Note', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
    color: {
      type: DataTypes.ENUM('pink', 'yellow', 'lightgrey', 'cyan', 'purple'),
      allowNull: false,
    }    
    // Add more fields as needed for your Note model
  });
  return Note ;
}