import express from 'express';

const fs = require('fs');
const path = require('path');

const router = express.Router();


router.post('/', async (req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
  
    logger.info('request comming.'+req.body.urls);
  
    try {
  
      let comelist = req.body.urls.includes(':::') ? req.body.urls.split(':::') : [req.body.urls];
      const downres = await downloadImages(comelist);
  
      comelist.map((element) => {
        mainList.push({
          originPath : element,
          uploadPath: '',
          cropPath: '',
          status: 200
        });
      });
  
      if(downres == 200) {
  
        res.status(awsres.status).json(awsres.result);
  
        mainList = [];
        logger.info('FINISH');
        logger.info('---------------');


        const directory = 'uploads';

        fs.readdir(directory, (err, files) => {
          if (err) throw err;

          for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
              if (err) throw err;
            });
          }
        });

        const directory2 = 'crop';

        fs.readdir(directory2, (err, files) => {
          if (err) throw err;

          for (const file of files) {
            fs.unlink(path.join(directory2, file), err => {
              if (err) throw err;
            });
          }
        });
      } else {
        logger.warn('Local Download Fail');
      }
    } catch (err) {
      mainList = [];
      logger.error('API ERROR');
      next(err);
    }
  });

export default router;