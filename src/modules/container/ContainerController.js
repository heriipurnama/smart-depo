"use strict";

const baseResponse = require("../../utils/helper/Response");
const { container,container_code } = require("../../db/models");

class ContainerController {
	static async createNew(req, res, next) {
		let { crNo, dset } = req.body;
		// return res.json(req.body);
		let defaultImage =
			"https://i.pinimg.com/564x/82/64/00/826400943f7549d21cec0418d1a32e2b.jpg";
		try {
			const [payload, created] = await container.findOrCreate({ 
				where: {
					crno: crNo
				},
				defaults: dset
			})
			if(created === false){
                throw new Error(`Container Exist, cccode: ${crNo} exists!`);
			} else {
				baseResponse({ message:"Container Created " , data: payload})(res);
			}
		} catch (error) {
			res.status(400);
			next(error);
		}
	}

	static async update(req, res, next) {
		let { crNo, dset } = req.body;
		let selector = { 
			where: { crno: crNo }
		};
		try {
			let dataContainer = await container.update(dset, selector);

			if (!dataContainer) {
				throw new Error(`Container No: ${crNo} doesn't exists!`);
			}
			baseResponse({
				message: "Update Success",
				data: dataContainer,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async listOne(req, res, next) {
		let { crNo } = req.body;
		
		try {
			let dataContainer = await container.findOne({ 
				attributes: {
					exclude: ["createdAt", "updatedAt"]
				},
				where: {
					crno: crNo
				}
			});

			if (!dataContainer) {
				throw new Error(`Container No: ${crNo} doesn't exists!`);
			}
			baseResponse({
				message: "Get Data Success",
				data: dataContainer,
			})(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async list(req, res, next) {
        let {start, rows} = req.body;

		try {
			let payload = await container.findAll({
				offset: start,
				limit: rows,
				attributes: {
					exclude: ["createdAt", "updatedAt"]
				},
				include:[{
					model:container_code,
					required: false, // do not generate INNER JOIN
                    attributes: { exclude:["createdAt", "updatedAt"]}
				}]
			});
			baseResponse({ message: "list containers", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}

	static async delete(req, res, next) {
		let {crNo} = req.body; 
		try {
			let payload = await container.destroy({
				where:{crno: crNo}
			});
			baseResponse({ message: "Success Delete Container", data: payload })(res, 200);
		} catch (error) {
			res.status(403);
			next(error);
		}
	}


	static async cek(req, res, next) {
		try {
			res.status(200);
			return res.json(req.body);
		} catch (error) {
			res.status(403);
			next(error);
		}
    }
    
    static async checkContainerCode(req, res, next) {
        let {cContainer} = req.body;

        // let cContainer = "FKS0013";
        let len = cContainer.length;
        let mcekd = cContainer.substr(len-1,1);
        let hasil = 0;
        try {
            if (cContainer.substr(0,4).toUpperCase()== "HLCU") 
                $hasil = checkDgthl(cContainer.substr(0, 10));
            else      
                hasil = checkDigit(cContainer.substr( 0, 10));

            if (hasil==mcekd) {
                console.log('true');
                baseResponse({ message: "Success", data: true })(res, 200)
            } else{
                console.log('false');
                baseResponse({ message: "Success", data: false })(res, 200)
            }
        } catch (error) {
			res.status(403);
			next(error);
		}
    }
}


let checkDigit = (arg1) =>{
    let anilai = [];
    let jmd = 0;
    let Y = 0;
    for (let i = 1; i < 11; i++) {
        if (i==1)
                anilai[1] = 1;
            else if (i==2) 
            anilai[i] = anilai[i - 1] + 1;
            else
            anilai[i] = anilai[i - 1] * 2;
        
    }

    for (let i = 0; i < 11; i++) {
        let X = arg1.substr(i-1, 1);
        switch (X) {
            case "A": Y = 10;break;
            case "B": Y = 12;break;
            case "C": Y = 13;break;
            case "D": Y = 14;break;
            case "E": Y = 15;break;
            case "F": Y = 16;break;
            case "G": Y = 17;break;
            case "H": Y = 18;break;
            case "I": Y = 19;break;
            case "J": Y = 20;break;
            case "K": Y = 21;break;
            case "L": Y = 23;break;
            case "M": Y = 24;break;
            case "N": Y = 25;break;
            case "O": Y = 26;break;
            case "P": Y = 27;break;
            case "Q": Y = 28;break;
            case "R": Y = 29;break;
            case "S": Y = 30;break;
            case "T": Y = 31;break;
            case "U": Y = 32;break;
            case "V": Y = 34;break;
            case "W": Y = 35;break;
            case "X": Y = 36;break;
            case "Y": Y = 37;break;
            case "Z": Y = 38;break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9": Y=X;break;
            default : Y=0;
        }
        jmd = jmd + Y * anilai[i];
    }
    let hasil = jmd - Math.floor(jmd / 11) * 11;
    if (hasil == 10) 
        hasil = 0;
        return hasil;
    
}

let checkDgthl = (arg1)=> {
    let anilai = [];
    let jmd = 0;
    let Y = 0;

    for (let i = 1; i < 11; i++) {
        if (i==1)
            anilai[1] = 1;
        else if (i==2) 
            anilai[i] = anilai[i - 1] + 1;
        else
            anilai[i] = anilai[i - 1] * 2;
    }

    for (let i = 0; i < 11; i++) {
        let X = arg1.substr(i-1, 1);
        switch (X) {
            case "A": Y = 10;break;
            case "B": Y = 12;break;
            case "C": Y = 13;break;
            case "D": Y = 14;break;
            case "E": Y = 15;break;
            case "F": Y = 16;break;
            case "G": Y = 17;break;
            case "H": Y = 18;break;
            case "I": Y = 19;break;
            case "J": Y = 20;break;
            case "K": Y = 21;break;
            case "L": Y = 23;break;
            case "M": Y = 24;break;
            case "N": Y = 25;break;
            case "O": Y = 26;break;
            case "P": Y = 27;break;
            case "Q": Y = 28;break;
            case "R": Y = 29;break;
            case "S": Y = 30;break;
            case "T": Y = 31;break;
            case "U": Y = 32;break;
            case "V": Y = 34;break;
            case "W": Y = 35;break;
            case "X": Y = 36;break;
            case "Y": Y = 37;break;
            case "Z": Y = 38;break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9": Y=X;break;
            default : Y=0;
        }
        jmd = jmd + Y * anilai[i];
    }
    let hasil = jmd - Math.floor(jmd / 11) * 11;
    if (hasil == 10) 
        hasil = 0;
        return hasil;
}

let funB = (param) =>{

    console.log(`Hello from funB! ${param}`);
}

module.exports = ContainerController;
