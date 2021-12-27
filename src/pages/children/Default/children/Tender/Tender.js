import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const Tender = (props) => {
    return (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {props.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.status}
            </Typography>
            <Typography variant="body2">
                {props.description}
            </Typography>
          </CardContent>
        </Card>
    )
}

export {Tender}
