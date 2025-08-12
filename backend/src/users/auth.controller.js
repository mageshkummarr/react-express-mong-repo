 
const service = require('../users/auth.service');
const { OK } = require('../constants/statusCodes');
const tokenUtil = require('../utils/token');
const repository = require('../users/user.repository');

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {	 	  	    	   	 	      	 	
    next(err);
  }
};


exports.login = async (req, res, next) => {
  try {
    const user = await service.verifyUser(req.body);
    const accessToken = tokenUtil.generateAccessToken(user);
    const refreshToken = tokenUtil.generateRefreshToken(user);

    res
      .cookie('token', accessToken, {
        httpOnly: true,
        maxAge: 20 * 60 * 1000 // 2 minutes
      }).cookie('role',user.role,{
        httpOnly: false,
        maxAge: 20 * 60 * 1000 // 2
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      .status(200)
      .json({ message: 'Login successful' });
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new Error('Refresh token missing');

    const payload = tokenUtil.verifyRefreshToken(refreshToken);

    // ✅ Get full user details to include email + role
    const user = await repository.findById(payload.id);
    if (!user) throw new Error('User not found');

    const newAccessToken = tokenUtil.generateAccessToken(user);

    res.cookie('token', newAccessToken, {
      httpOnly: true,
      maxAge: 2 * 60 * 1000 // 2 mins
    });

    res.status(200).json({ message: 'Access token refreshed' });
  } catch (err) {
    next(err);
  }
};	 	  	    	   	 	      	 	
