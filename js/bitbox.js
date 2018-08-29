var bb = {
	objtosigned: function(_obj) {
		var sign_str = objtosignstr(_obj);
		var sign = $.signbykey(decodeURIComponent(sign_str));
		sign_str += "&sign=" + sign;
		return sign_str;
	},
	api_get_data: function(api, obj_data, fc) {
		var post_url = $.server_address + api + "?";
		var dtd = $.Deferred();

		if(!!obj_data) {
			var sign_str = this.objtosigned(obj_data);
			//console.log(post_url + sign_str);
			$.ajax({
				url: post_url + sign_str,
				type: fc || 'get',
				data: {},
				timeout: 6000,
				dataType: 'json'
			}).then(function(rs) {
				dtd.resolve(rs);
			}).catch(function(e) {
				console.log(JSON.stringify(e));
				console.log(post_url + sign_str);
				dtd.resolve(e);
			});

			/*if(fc == "post") {
				$.post(post_url + sign_str).then(function(rs) {
					dtd.resolve(rs);
				}).catch(function(e) {
					console.log(JSON.stringify(e));
					dtd.resolve(e);
				})
			} else {
				$.get(post_url + sign_str).then(function(rs) {
					dtd.resolve(rs);
				}).catch(function(e) {
					console.log(JSON.stringify(e));
					dtd.resolve(e);
				})
			}*/
		}
		return dtd.promise();
	},
	isuser: function() {
		var dtd = $.Deferred();
		var _obj = {
			key: $.getsourcePublicKey(),
			time: $.getnow()
		}

		this.api_get_data("register_check_user", _obj).then(function(rs) {
			dtd.resolve(rs);
		}).catch(function(e) {
			console.log(JSON.stringify(e));
		});
		return dtd.promise();
	},
	order_status: function(tx) {
		switch(tx) {
			case 'waiting':
				return '等待付款';
			case 'processing':
				return '客服处理中';
			case 'done':
				return '订单已完成';
			case 'Canceled':
				return '已取消';
			case 'Abnormal':
				return '订单异常';
		}
	},
	order_memo: function(tx, time) {
		var kp = StellarSdk.Keypair.fromSecret($.getsecretonekey());
		time = time.replace(/-/g, "/");
		var _time = ((new Date(time)).valueOf() / 1000).toString();
		var _memo = decrypt_str25519(tx, _time, kp.publicKey(), kp.secret());
		return _memo;
	},
	verify_deposit_cs: function(deposit_assets) {//验证充值客服
		var re_obj;
		re_obj = [];
		$.each(deposit_assets, function(index, value) {
			if(value.csList && value.csList.length > 0) {
				deposit_assets[index].csList_authentic = [];
				$.each(value.csList, function(i, v) {
					if(cslist.indexOf(v.cs_key)) { //cslist为内置白名单
						try {

							var _au_obj = {
								bank: v.payeeAccountBank,
								owner: v.payeeAccountOwner,
								account: v.payeeAccountNo
							}

							var au_str = decodeURIComponent(objtosignstr(_au_obj));
							var au_sign = new StellarSdk.Buffer(decodeURIComponent(v.sign), "base64"); //需要buffer类型
							var kp = StellarSdk.Keypair.fromPublicKey(v.cs_key);

							var isverify = kp.verify(au_str, au_sign);
							if(isverify) {
								deposit_assets[index].csList_authentic.push(v);
								return true;
							}
						} catch(e) {
							console.log(e);
						}
					}
				});
			}
		});
		
		$.each(deposit_assets, function(index, value) {
			if(!!value.csList_authentic && value.csList_authentic.length>0){
				re_obj.push(value);
			}
		});
		return re_obj;
	},
	verify_withdraw_cs: function(withdraw_assets) {//验证提现客服
		var re_obj;
		re_obj = [];
		$.each(withdraw_assets, function(index, value) {
			if(cslist.indexOf(value.withdrawAcount)) {
				re_obj.push(value);
			}
		})
		return re_obj;
	}
}