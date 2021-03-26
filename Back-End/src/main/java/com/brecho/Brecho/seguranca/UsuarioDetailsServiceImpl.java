package com.brecho.Brecho.seguranca;

import java.util.Optional;

import com.brecho.Brecho.model.Usuario;
import com.brecho.Brecho.repository.UsuarioRepository;
import com.brecho.Brecho.seguranca.UsuarioDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<Usuario> user = usuarioRepository.findByEmail(email);
		user.orElseThrow(() -> new UsernameNotFoundException(email + " not found."));
		
		return user.map(UsuarioDetailsImpl::new).get();
	}
	
}
